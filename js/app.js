const root = document.querySelector('main');
if (root) {
  root.insertAdjacentHTML(
    'beforeend',
    `<p style="opacity:.8;font-size:.9rem">Backend API listo en <code>/api</code>.</p>`,
  );
}
