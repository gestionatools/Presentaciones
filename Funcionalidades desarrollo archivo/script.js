(() => {
  const stage = document.querySelector('deck-stage');
  if (!stage) return;

  stage.addEventListener('slidechange', (event) => {
    const slide = event.detail?.slide;
    if (!slide) return;
    slide.querySelectorAll('.red-line, .red-rect').forEach((shape, index) => {
      shape.style.animationDelay = `${0.45 + index * 0.08}s`;
    });
  });
})();
