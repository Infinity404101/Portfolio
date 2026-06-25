// ── Per-slider state (fixes the single global index bug) ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slider').forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const dots   = slider.querySelectorAll('.dot');
    if (!slides.length) return;

    let current = 0;
    let timer;

    function show(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(next, 3500);
    }

    // Buttons
    const btnPrev = slider.querySelector('.slider-btn.prev');
    const btnNext = slider.querySelector('.slider-btn.next');
    if (btnPrev) btnPrev.addEventListener('click', () => { prev(); startAuto(); });
    if (btnNext) btnNext.addEventListener('click', () => { next(); startAuto(); });

    // Dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { show(i); startAuto(); });
    });

    // Init
    show(0);
    startAuto();
  });

  // ── Highlight active nav link ──
  const links = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(l => {
    if (l.getAttribute('href') === current) l.classList.add('active');
  });
});
