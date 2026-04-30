const APP_VERSION = 'v2.31.0';

const presentationFolders = [
  {
    name: 'ARCHIVO',
    title: 'Archivo electrónico - Gestiona',
    path: 'ARCHIVO/Archivo electronico - Gestiona.html',
    description: 'Versión original movida al archivo histórico.'
  },
  {
    name: 'Archivo 2',
    title: 'Archivo 2 - Gestiona',
    path: 'Archivo 2/Archivo electronico - Gestiona.html',
    description: 'Segunda variante de la presentación de archivo.'
  },
  {
    name: 'Configuracion procesos - Gestiona',
    title: 'Configuración de procesos - Gestiona',
    path: 'Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html',
    description: 'Presentación enfocada en flujos y configuración de procesos.'
  }
];

const container = document.getElementById('presentations');
const appVersionNode = document.getElementById('appVersion');

if (appVersionNode) {
  appVersionNode.textContent = `Versión ${APP_VERSION}`;
}

function openFullscreenPresentation(path) {
  const presentationWindow = window.open(encodeURI(path), '_blank', 'noopener,noreferrer');
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

presentationFolders.forEach((folder) => {
  const details = document.createElement('details');
  details.className = 'accordion__item';

  details.innerHTML = `
    <summary class="accordion__summary">${folder.name}</summary>
    <div class="accordion__content">
      <h3>${folder.title}</h3>
      <p>${folder.description}</p>
      <div class="card__actions">
        <a class="btn" href="${encodeURI(folder.path)}" target="_blank" rel="noopener noreferrer">Acceder a la presentación</a>
        <button class="btn btn--ghost" type="button" data-expand-path="${folder.path}">Expandir</button>
      </div>
    </div>
  `;

  const expandButton = details.querySelector('[data-expand-path]');
  expandButton?.addEventListener('click', () => openFullscreenPresentation(folder.path));

  container.appendChild(details);
});
