const APP_VERSION = 'v2.42.0';

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
          <button class="btn btn--ghost" type="button" data-expand-path="${item.path}">Expandir</button>
        </div>
      </div>
    `;

    const expandButton = levelTwo.querySelector('[data-expand-path]');
    expandButton?.addEventListener('click', () => openFullscreenPresentation(item.path));

    levelOneContent.appendChild(levelTwo);
  });

  levelOne.appendChild(levelOneContent);
  container.appendChild(levelOne);
});
