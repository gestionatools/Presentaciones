const presentations = [
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

const container = document.getElementById('presentations');

presentations.forEach((deck) => {
  const article = document.createElement('article');
  article.className = 'card';
  article.innerHTML = `
    <h3>${deck.title}</h3>
    <p>${deck.description}</p>
    <a class="btn" href="${encodeURI(deck.path)}" target="_blank" rel="noopener noreferrer">Abrir presentación</a>
  `;
  container.appendChild(article);
});
