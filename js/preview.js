let currentUrl;

export const updatePreview = (content, ext, iframe) => {
  if (!iframe) return;

  const safeExt = (ext || '').toLowerCase();
  let html = content;

  if (safeExt === 'css') {
    html = `<!doctype html><html><head><style>${content}</style></head><body><h2>Preview CSS</h2><p>Estilos aplicados al documento.</p></body></html>`;
  }

  if (safeExt === 'js') {
    html = `<!doctype html><html><body><h2>Preview JS</h2><script>${content}<\/script></body></html>`;
  }

  const blob = new Blob([html], { type: 'text/html' });
  if (currentUrl) URL.revokeObjectURL(currentUrl);
  currentUrl = URL.createObjectURL(blob);
  iframe.src = currentUrl;
};
