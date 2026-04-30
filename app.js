const APP_VERSION = 'v2.18.0';

const presentations = [

  {
    title: 'Presentación padrón',
    path: 'Presentación padrón/presentacion-padron.html',
    description: 'Nueva presentación de padrón en HTML con estilo moderno.'
  },
  {
    title: 'Archivo electrónico - Gestiona',
    path: 'ARCHIVO/Archivo electronico - Gestiona.html',
    description: 'Versión original movida al archivo histórico.'
  },
  {
    title: 'Archivo 2 - Gestiona',
    path: 'Archivo 2/Archivo electronico - Gestiona.html',
    description: 'Segunda variante de la presentación de archivo.'
  },
  {
    title: 'Configuración de procesos - Gestiona',
    path: 'Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html',
    description: 'Presentación enfocada en flujos y configuración de procesos.'
  }
];


function collectAppFolders(decks) {
  const folderSet = new Set(['.']);
  decks.forEach((deck) => {
    const raw = (deck.path || '').trim();
    if (!raw) return;
    const parts = raw.split('/');
    if (parts.length > 1 && parts[0]) folderSet.add(parts[0]);
  });
  return Array.from(folderSet);
}

function renderFolderAccess() {
  const foldersHost = document.getElementById('appFolders');
  if (!foldersHost) return;
  const folders = collectAppFolders(presentations);
  foldersHost.innerHTML = '';

  folders.forEach((folder) => {
    const item = document.createElement('a');
    item.className = 'folder-link';
    item.href = folder === '.' ? './' : `./${folder}/`;
    item.target = '_blank';
    item.rel = 'noopener noreferrer';
    item.textContent = folder === '.' ? 'Raíz de la aplicación' : folder;
    foldersHost.appendChild(item);
  });
}

const container = document.getElementById('presentations');
const appVersionNode = document.getElementById('appVersion');

if (appVersionNode) {
  appVersionNode.textContent = `Versión ${APP_VERSION}`;
}

renderFolderAccess();

function toAbsoluteUrl(relativeOrAbsolute, baseUrl) {
  try {
    return new URL(relativeOrAbsolute, baseUrl).href;
  } catch (_) {
    return null;
  }
}

async function fetchTextSafe(url) {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      return { ok: false, status: response.status, content: null };
    }
    const content = await response.text();
    return { ok: true, status: response.status, content };
  } catch (error) {
    return { ok: false, status: 0, content: null, error: String(error) };
  }
}

async function fetchBinaryAsDataUrl(url) {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      return { ok: false, status: response.status, dataUrl: null };
    }
    const blob = await response.blob();
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return { ok: true, status: response.status, dataUrl: typeof dataUrl === 'string' ? dataUrl : null };
  } catch (error) {
    return { ok: false, status: 0, dataUrl: null, error: String(error) };
  }
}

async function inlineMediaSources(doc, htmlUrl) {
  const sourceNodes = Array.from(doc.querySelectorAll('[src]'));
  const linkAssetNodes = Array.from(doc.querySelectorAll('link[rel~="icon"], link[rel="preload"][as="image"]'));
  const styleNodes = Array.from(doc.querySelectorAll('[style]'));
  const report = [];

  for (const node of sourceNodes) {
    const src = node.getAttribute('src');
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) continue;
    const absoluteSrc = toAbsoluteUrl(src, htmlUrl);
    if (!absoluteSrc) continue;
    const binary = await fetchBinaryAsDataUrl(absoluteSrc);
    if (binary.ok && binary.dataUrl) {
      node.setAttribute('src', binary.dataUrl);
    }
    report.push({ attr: 'src', original: src, inlined: Boolean(binary.ok && binary.dataUrl) });
  }

  for (const node of linkAssetNodes) {
    const href = node.getAttribute('href');
    if (!href || href.startsWith('data:') || href.startsWith('blob:')) continue;
    const absoluteHref = toAbsoluteUrl(href, htmlUrl);
    if (!absoluteHref) continue;
    const binary = await fetchBinaryAsDataUrl(absoluteHref);
    if (binary.ok && binary.dataUrl) {
      node.setAttribute('href', binary.dataUrl);
    }
    report.push({ attr: 'href', original: href, inlined: Boolean(binary.ok && binary.dataUrl) });
  }

  for (const node of styleNodes) {
    const styleValue = node.getAttribute('style') || '';
    const matches = [...styleValue.matchAll(/url\((['"]?)([^'")]+)\1\)/g)];
    let nextStyle = styleValue;
    for (const match of matches) {
      const candidate = match[2];
      if (!candidate || candidate.startsWith('data:') || candidate.startsWith('blob:')) continue;
      const absoluteCandidate = toAbsoluteUrl(candidate, htmlUrl);
      if (!absoluteCandidate) continue;
      const binary = await fetchBinaryAsDataUrl(absoluteCandidate);
      if (binary.ok && binary.dataUrl) {
        nextStyle = nextStyle.replace(match[0], `url("${binary.dataUrl}")`);
      }
      report.push({ attr: 'style:url()', original: candidate, inlined: Boolean(binary.ok && binary.dataUrl) });
    }
    if (nextStyle !== styleValue) {
      node.setAttribute('style', nextStyle);
    }
  }

  return report;
}

async function buildPresentaJson(deck) {
  const htmlUrl = toAbsoluteUrl(deck.path, window.location.href);
  const htmlResult = await fetchTextSafe(htmlUrl);

  if (!htmlResult.ok || !htmlResult.content) {
    throw new Error('No se pudo cargar el HTML de la presentación.');
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlResult.content, 'text/html');
  const autonomousDoc = parser.parseFromString(htmlResult.content, 'text/html');

  const styleNodes = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
  const inlineStyles = Array.from(doc.querySelectorAll('style')).map((node, index) => ({
    id: `inline-style-${index + 1}`,
    content: node.textContent || ''
  }));

  const externalStyles = await Promise.all(
    styleNodes.map(async (node) => {
      const href = node.getAttribute('href') || '';
      const absoluteHref = toAbsoluteUrl(href, htmlUrl);
      const cssResult = absoluteHref ? await fetchTextSafe(absoluteHref) : null;
      return {
        href,
        absoluteHref,
        status: cssResult?.status ?? 0,
        content: cssResult?.content ?? null,
        loaded: Boolean(cssResult?.ok)
      };
    })
  );

  externalStyles.forEach((style) => {
    if (!style.href || !style.loaded || !style.content) return;
    const linkNode = autonomousDoc.querySelector(`link[rel="stylesheet"][href="${CSS.escape(style.href)}"]`);
    if (!linkNode) return;
    const styleTag = autonomousDoc.createElement('style');
    styleTag.setAttribute('data-origin-href', style.href);
    styleTag.textContent = style.content;
    linkNode.replaceWith(styleTag);
  });

  const scriptNodes = Array.from(doc.querySelectorAll('script'));
  const scripts = await Promise.all(
    scriptNodes.map(async (node, index) => {
      const src = node.getAttribute('src');
      if (!src) {
        return {
          id: `inline-script-${index + 1}`,
          type: 'inline',
          content: node.textContent || ''
        };
      }

      const absoluteSrc = toAbsoluteUrl(src, htmlUrl);
      const jsResult = absoluteSrc ? await fetchTextSafe(absoluteSrc) : null;
      return {
        id: `external-script-${index + 1}`,
        type: 'external',
        src,
        absoluteSrc,
        status: jsResult?.status ?? 0,
        content: jsResult?.content ?? null,
        loaded: Boolean(jsResult?.ok)
      };
    })
  );

  scripts.forEach((script) => {
    if (script.type !== 'external' || !script.src) return;
    const scriptNode = autonomousDoc.querySelector(`script[src="${CSS.escape(script.src)}"]`);
    if (!scriptNode) return;
    if (script.loaded && script.content) {
      const inlineScript = autonomousDoc.createElement('script');
      inlineScript.setAttribute('data-origin-src', script.src);
      inlineScript.textContent = script.content;
      scriptNode.replaceWith(inlineScript);
      return;
    }
    scriptNode.remove();
  });

  const embeddedAssetsReport = await inlineMediaSources(autonomousDoc, htmlUrl);

  const mediaSelectors = ['img[src]', 'video[src]', 'audio[src]', 'source[src]'];
  const mediaAssets = Array.from(doc.querySelectorAll(mediaSelectors.join(','))).map((node) => {
    const src = node.getAttribute('src') || '';
    return {
      tag: node.tagName.toLowerCase(),
      src,
      absoluteSrc: toAbsoluteUrl(src, htmlUrl),
      alt: node.getAttribute('alt') || null
    };
  });

  const presentationName = deck.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

  return {
    format: 'presentajson',
    formatVersion: '1.0.0',
    exportedAt: new Date().toISOString(),
    appVersion: APP_VERSION,
    source: {
      title: deck.title,
      path: deck.path,
      url: htmlUrl
    },
    document: {
      title: doc.title,
      lang: doc.documentElement.lang || 'es',
      headHtml: autonomousDoc.head?.innerHTML || '',
      bodyHtml: autonomousDoc.body?.innerHTML || ''
    },
    styles: {
      external: externalStyles,
      inline: inlineStyles
    },
    scripts,
    notes: [
      'El PresentaJSON exportado es autónomo: sustituye hojas de estilo y scripts externos por contenido inline cuando están disponibles.',
      'Los assets multimedia y referencias visuales compatibles se convierten a data URLs para evitar dependencias de GitHub o rutas remotas.',
      'Si un recurso externo no fue accesible durante la exportación, quedará marcado en "assets.embeddingReport" como no incrustado.'
    ],
    assets: {
      media: mediaAssets,
      embeddingReport: embeddedAssetsReport
    },
    exportFileName: `${presentationName}.presentajson.json`
  };
}

function downloadJson(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

presentations.forEach((deck) => {
  const article = document.createElement('article');
  article.className = 'card';
  article.innerHTML = `
    <h3>${deck.title}</h3>
    <p>${deck.description}</p>
    <div class="card__actions">
      <a class="btn" href="${encodeURI(deck.path)}" target="_blank" rel="noopener noreferrer">Abrir presentación</a>
      <button class="btn btn--ghost" type="button" data-export-path="${deck.path}">Exportar PresentaJSON</button>
    </div>
  `;

  const exportButton = article.querySelector('[data-export-path]');
  exportButton?.addEventListener('click', async () => {
    exportButton.disabled = true;
    const originalText = exportButton.textContent;
    exportButton.textContent = 'Exportando...';

    try {
      const payload = await buildPresentaJson(deck);
      downloadJson(payload.exportFileName, payload);
      exportButton.textContent = 'Exportado ✅';
      setTimeout(() => {
        exportButton.textContent = originalText;
        exportButton.disabled = false;
      }, 1200);
    } catch (error) {
      console.error(error);
      exportButton.textContent = 'Error al exportar';
      setTimeout(() => {
        exportButton.textContent = originalText;
        exportButton.disabled = false;
      }, 1800);
    }
  });

  container.appendChild(article);
});


const presentajsonInput = document.getElementById('presentaJsonInput');
const importPresentaJsonBtn = document.getElementById('importPresentaJsonBtn');

function isPresentaJsonPayload(payload) {
  return Boolean(
    payload &&
    payload.format === 'presentajson' &&
    payload.document &&
    typeof payload.document.headHtml === 'string' &&
    typeof payload.document.bodyHtml === 'string'
  );
}

function renderImportedPresentaJson(payload) {
  const title = payload.document.title || 'Presentación importada';
  const lang = payload.document.lang || 'es';
  const runtime = '<script>window.__presentaJsonImported=true;<\/script>';
  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
${payload.document.headHtml}
${runtime}
</head>
<body>
${payload.document.bodyHtml}
</body>
</html>`;

  const importedWindow = window.open('', '_blank', 'noopener,noreferrer');
  if (!importedWindow) {
    throw new Error('El navegador bloqueó la ventana emergente para la importación.');
  }

  importedWindow.document.open();
  importedWindow.document.write(html);
  importedWindow.document.close();
}

async function importPresentaJsonFile(file) {
  const content = await file.text();
  const payload = JSON.parse(content);

  if (!isPresentaJsonPayload(payload)) {
    throw new Error('El archivo no cumple el formato PresentaJSON esperado.');
  }

  renderImportedPresentaJson(payload);
}

if (importPresentaJsonBtn && presentajsonInput) {
  importPresentaJsonBtn.addEventListener('click', async () => {
    const file = presentajsonInput.files?.[0];
    if (!file) {
      importPresentaJsonBtn.textContent = 'Selecciona archivo';
      setTimeout(() => {
        importPresentaJsonBtn.textContent = 'Abrir importado';
      }, 1200);
      return;
    }

    const originalText = importPresentaJsonBtn.textContent;
    importPresentaJsonBtn.disabled = true;
    importPresentaJsonBtn.textContent = 'Importando...';

    try {
      await importPresentaJsonFile(file);
      importPresentaJsonBtn.textContent = 'Importado ✅';
    } catch (error) {
      console.error(error);
      importPresentaJsonBtn.textContent = 'Importación fallida';
    } finally {
      setTimeout(() => {
        importPresentaJsonBtn.textContent = originalText;
        importPresentaJsonBtn.disabled = false;
      }, 1600);
    }
  });
}
