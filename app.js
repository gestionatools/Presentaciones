const APP_VERSION = 'v2.59.0';

const presentationGroups = [
  {
    name: 'Archivo',
    items: [
      {
        name: 'ARCHIVO',
        title: 'Archivo electrónico - Gestiona',
        path: 'ARCHIVO/Archivo electronico - Gestiona.html',
        description: 'Versión original movida al archivo histórico.'
      },
      {
        name: 'ARCHIVO 2',
        title: 'Archivo 2 - Gestiona',
        path: 'Archivo 2/Archivo electronico - Gestiona.html',
        description: 'Segunda variante de la presentación de archivo.'
      },
      {
        name: 'Archivo (medios)',
        title: 'Archivo (medios) - Gestiona',
        path: 'Archivo (medios)/Archivo electronico - Gestiona.html',
        description: 'Duplicado editado de ARCHIVO 2 para el itinerario de medios.'
      },
      {
        name: 'Funcionalidades desarrollo archivo',
        title: 'Funcionalidades desarrollo archivo - Gestiona',
        path: 'Funcionalidades desarrollo archivo/Funcionalidades desarrollo archivo.html',
        description: 'Recreación HTML/CSS/JS de las funcionalidades de acceso interno y solicitud de acceso del módulo de archivo.'
      }
    ]
  },
  {
    name: 'Gestión de Procesos',
    items: [
      {
        name: 'Configuracion procesos - Gestiona',
        title: 'Configuración de procesos - Gestiona',
        path: 'Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html',
        description: 'Presentación enfocada en flujos y configuración de procesos.'
      }
    ]
  },
  {
    name: 'Certificación',
    items: [
      {
        name: 'I Hackathon Gestiona Eivissa',
        title: 'I Hackathon Gestiona Eivissa',
        path: 'Hackathon Certificados/I Hackathon Gestiona Eivissa.html',
        description: 'Sesión informativa sobre comunicación y presentación de proyectos del I Hackathon Gestiona · Comunidad de Certificados. Ibiza, mayo 2026.'
      }
    ]
  },
  {
    name: 'Padrón',
    items: [
      {
        name: 'El Fichero de Reparos',
        title: 'El Fichero de Reparos del INE',
        path: 'Padrón/El Fichero de Reparos/El Fichero de Reparos.html',
        description: 'Carga del fichero R, revisión de incidencias (TIPOINF D/R/S, CDEV NO/GE/IN/NE) y presentación de alegaciones ante el INE. Incluye tabla de claves CALEG y casos prácticos.'
      }
    ]
  },
  {
    name: 'GFD',
    items: [
      {
        name: 'Reglada + CODE - Gestiona',
        title: 'Reglada + CODE - Gestiona',
        path: 'GFD/Reglada - CODE - Gestiona.html',
        description: 'Taller de Gestiona CODE y tramitación reglada con circuito y lógicas.'
      }
    ]
  }
];

const container = document.getElementById('presentations');
const appVersionNode = document.getElementById('appVersion');

if (appVersionNode) {
  appVersionNode.textContent = `Versión ${APP_VERSION}`;
}

const reviewState = new Map();

function buildPresentationUrl(path, selectedSlides) {
  const encodedPath = encodeURI(path);
  if (!Array.isArray(selectedSlides) || !selectedSlides.length) return encodedPath;
  const slideParam = selectedSlides.map((slideNumber) => Number(slideNumber)).filter(Number.isFinite).join(',');
  if (!slideParam) return encodedPath;
  return `${encodedPath}?slides=${encodeURIComponent(slideParam)}`;
}

function openFullscreenPresentation(path, selectedSlides) {
  const presentationWindow = window.open(buildPresentationUrl(path, selectedSlides), '_blank', 'noopener,noreferrer');
  if (!presentationWindow) return;

  const triggerFullscreen = () => {
    const doc = presentationWindow.document;
    const el = doc.documentElement;
    const request = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (typeof request === 'function') {
      request.call(el).catch?.(() => {});
    }
  };

  presentationWindow.addEventListener('load', () => {
    try { triggerFullscreen(); } catch (_) {}
  }, { once: true });
}

function getSlideLabel(slide, index) {
  const rawLabel = slide.getAttribute('data-label') || slide.getAttribute('data-screen-label') || '';
  const heading = slide.querySelector('h1, h2, h3, [data-title]');
  const fallback = heading ? heading.textContent.trim() : `Slide ${index + 1}`;
  return (rawLabel || fallback).replace(/^\s*\d+\s*/, '').trim() || fallback;
}

async function loadPresentationSummary(item, mountNode) {
  const response = await fetch(encodeURI(item.path));
  if (!response.ok) throw new Error(`No se pudo cargar ${item.path}`);

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const slides = Array.from(doc.querySelectorAll('deck-stage > section'));
  if (!slides.length) throw new Error('La presentación no contiene slides detectables.');

  const previousSelection = reviewState.get(item.path);
  const selected = previousSelection instanceof Set
    ? new Set([...previousSelection].filter((slideNumber) => slideNumber >= 1 && slideNumber <= slides.length))
    : new Set(slides.map((_, index) => index + 1));
  if (!selected.size) selected.add(1);
  reviewState.set(item.path, selected);

  mountNode.replaceChildren();

  const toolbar = document.createElement('div');
  toolbar.className = 'summary__toolbar';

  const intro = document.createElement('p');
  intro.className = 'summary__hint';
  intro.textContent = 'Revisa los thumbnails, desmarca los slides que quieras omitir y abre la presentación con esa selección.';

  const viewButton = document.createElement('button');
  viewButton.className = 'btn summary__view-btn';
  viewButton.type = 'button';
  viewButton.textContent = 'Ver presentación';

  const counter = document.createElement('span');
  counter.className = 'summary__counter';

  toolbar.append(intro, viewButton, counter);

  const rail = document.createElement('div');
  rail.className = 'summary__rail';
  rail.setAttribute('aria-label', `Resumen de slides de ${item.title}`);

  const updateCounter = () => {
    counter.textContent = `${selected.size} de ${slides.length} slides visibles`;
    viewButton.disabled = selected.size === 0;
  };

  slides.forEach((slide, index) => {
    const slideNumber = index + 1;
    const card = document.createElement('article');
    card.className = 'summary-card';

    const frameWrap = document.createElement('div');
    frameWrap.className = 'summary-card__frame';

    const iframe = document.createElement('iframe');
    iframe.title = `${item.title} · slide ${slideNumber}`;
    iframe.src = `${encodeURI(item.path)}#${slideNumber}`;
    iframe.loading = 'lazy';
    iframe.tabIndex = -1;
    iframe.setAttribute('aria-hidden', 'true');
    frameWrap.appendChild(iframe);

    const label = document.createElement('label');
    label.className = 'summary-card__check';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = selected.has(slideNumber);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) selected.add(slideNumber);
      else selected.delete(slideNumber);
      reviewState.set(item.path, selected);
      card.classList.toggle('summary-card--disabled', !checkbox.checked);
      updateCounter();
    });

    const labelText = document.createElement('span');
    labelText.textContent = `Visualizar slide ${slideNumber}`;

    label.append(checkbox, labelText);

    const title = document.createElement('h4');
    title.textContent = getSlideLabel(slide, index);

    card.classList.toggle('summary-card--disabled', !checkbox.checked);
    card.append(frameWrap, label, title);
    rail.appendChild(card);
  });

  viewButton.addEventListener('click', () => openFullscreenPresentation(item.path, [...selected].sort((a, b) => a - b)));

  mountNode.append(toolbar, rail);
  updateCounter();
}

function showSummary(item, mountNode, triggerButton) {
  mountNode.hidden = false;
  mountNode.innerHTML = '<div class="summary__loading">Cargando resumen de slides…</div>';
  triggerButton.textContent = 'Actualizar resumen';
  loadPresentationSummary(item, mountNode).catch((error) => {
    mountNode.innerHTML = '';
    const errorNode = document.createElement('p');
    errorNode.className = 'summary__error';
    errorNode.textContent = error.message || 'No se pudo preparar el resumen de la presentación.';
    mountNode.appendChild(errorNode);
  });
}

presentationGroups.forEach((group) => {
  const levelOne = document.createElement('details');
  levelOne.className = 'accordion__item';

  const levelOneSummary = document.createElement('summary');
  levelOneSummary.className = 'accordion__summary';
  levelOneSummary.textContent = group.name;
  levelOne.appendChild(levelOneSummary);

  const levelOneContent = document.createElement('div');
  levelOneContent.className = 'accordion__content';

  group.items.forEach((item) => {
    const levelTwo = document.createElement('details');
    levelTwo.className = 'accordion__item';

    levelTwo.innerHTML = `
      <summary class="accordion__summary">${item.name}</summary>
      <div class="accordion__content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="card__actions">
          <a class="btn" href="${encodeURI(item.path)}" target="_blank" rel="noopener noreferrer">Acceder a la presentación</a>
          <button class="btn btn--ghost" type="button" data-summary-path="${item.path}">Ver resumen</button>
          <button class="btn btn--ghost" type="button" data-expand-path="${item.path}">Expandir</button>
        </div>
        <div class="summary" data-summary-mount hidden></div>
      </div>
    `;

    const summaryButton = levelTwo.querySelector('[data-summary-path]');
    const summaryMount = levelTwo.querySelector('[data-summary-mount]');
    summaryButton?.addEventListener('click', () => showSummary(item, summaryMount, summaryButton));

    const expandButton = levelTwo.querySelector('[data-expand-path]');
    expandButton?.addEventListener('click', () => openFullscreenPresentation(item.path));

    levelOneContent.appendChild(levelTwo);
  });

  levelOne.appendChild(levelOneContent);
  container.appendChild(levelOne);
});
