const APP_VERSION = 'v3.0.0';

const presentations = [
  {
    title: 'Archivo electrónico - Gestiona',
    path: 'ARCHIVO/Archivo electronico - Gestiona.html',
    description: 'Versión original migrada a Reveal.js.'
  },
  {
    title: 'Archivo 2 - Gestiona',
    path: 'Archivo 2/Archivo electronico - Gestiona.html',
    description: 'Variante de archivo adaptada a Reveal.js.'
  },
  {
    title: 'Configuración de procesos - Gestiona',
    path: 'Configuracion procesos - Gestiona/Configuración de procesos - Gestiona.html',
    description: 'Presentación de configuración operativa en Reveal.js.'
  }
];

const container = document.getElementById('presentations');

function buildIntroSection() {
  const section = document.createElement('section');
  section.innerHTML = `
    <main class="app">
      <header class="hero">
        <img src="recursos/brand-wave.svg" alt="Decoración" class="hero__bg" />
        <h1>Centro de Presentaciones (Reveal.js)</h1>
        <p>Nuevo paradigma: app lanzadora y decks consolidados sobre Reveal.js.</p>
        <small>Versión ${APP_VERSION}</small>
      </header>
    </main>
  `;
  return section;
}

function buildPresentationSection(deck) {
  const section = document.createElement('section');
  section.innerHTML = `
    <main class="app">
      <section>
        <h2>${deck.title}</h2>
        <p>${deck.description}</p>
        <p><a class="btn" href="${deck.path}" target="_blank" rel="noreferrer">Abrir presentación</a></p>
      </section>
    </main>
  `;
  return section;
}

container.appendChild(buildIntroSection());
presentations.forEach((deck) => container.appendChild(buildPresentationSection(deck)));

Reveal.initialize({
  hash: true,
  transition: 'fade',
  slideNumber: true
});
