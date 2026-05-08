/* slides.js — Analiza: Producto e Implantación
   Custom enhancements on top of deck-stage.js  */

(function () {
  'use strict';

  // ── Animate staircase steps on slide entry ──
  function animateStairs(slideEl) {
    const steps = slideEl.querySelectorAll('.stair-step__block');
    steps.forEach((block, i) => {
      const finalHeight = block.style.height;
      block.style.height = '0px';
      block.style.transition = 'height 0.45s cubic-bezier(0.34,1.2,0.64,1)';
      block.style.transitionDelay = `${i * 0.1}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { block.style.height = finalHeight; });
      });
    });
  }

  // ── Animate dd-bars (slide 3) ──
  function animateBars(slideEl) {
    const bars = slideEl.querySelectorAll('.dd-bar');
    bars.forEach((bar, i) => {
      bar.style.opacity = '0';
      bar.style.transform = 'translateX(24px)';
      bar.style.transition = `opacity 0.35s ease, transform 0.35s ease`;
      bar.style.transitionDelay = `${i * 0.1}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.opacity = '1';
          bar.style.transform = 'translateX(0)';
        });
      });
    });
  }

  // ── Animate pyramid levels ──
  function animatePyramid(slideEl) {
    const levels = slideEl.querySelectorAll('.pyramid-level');
    levels.forEach((lvl, i) => {
      lvl.style.opacity = '0';
      lvl.style.transform = 'scaleX(0.6)';
      lvl.style.transition = `opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.2,0.64,1)`;
      lvl.style.transitionDelay = `${i * 0.12}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lvl.style.opacity = '1';
          lvl.style.transform = 'scaleX(1)';
        });
      });
    });
  }

  // ── Animate step items ──
  function animateSteps(slideEl) {
    const items = slideEl.querySelectorAll('.step-item');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(16px)';
      item.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
      item.style.transitionDelay = `${i * 0.18}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // ── Dispatch on slide change ──
  document.addEventListener('DOMContentLoaded', () => {
    const stage = document.querySelector('deck-stage');
    if (!stage) return;

    stage.addEventListener('slidechange', (e) => {
      const slide = e.detail.slide;
      if (!slide) return;

      // Run animations based on slide content
      if (slide.querySelectorAll('.stair-step__block').length) animateStairs(slide);
      if (slide.querySelectorAll('.dd-bar').length) animateBars(slide);
      if (slide.querySelectorAll('.pyramid-level').length) animatePyramid(slide);
      if (slide.querySelectorAll('.step-item').length) animateSteps(slide);
    });
  });
})();
