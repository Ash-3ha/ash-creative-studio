/**
 * ASH Creative Studio — Animations & Interactions
 * All animations respect prefers-reduced-motion.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Scroll Reveal ---------- */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (prefersReducedMotion) {
    reveals.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add('in');
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => io.observe(el));
}

/* ---------- Animated Counters ---------- */
function initCounters() {
  document.querySelectorAll('.stat .num').forEach((numEl) => {
    const target = parseFloat(numEl.dataset.count);
    const suffix = numEl.dataset.suffix || '';
    const span = numEl.querySelector('span');
    if (!span || isNaN(target)) return;

    let done = false;

    if (prefersReducedMotion) {
      span.textContent = target + suffix;
      return;
    }

    new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !done) {
            done = true;
            let cur = 0;
            const step = target / 40;
            const iv = setInterval(() => {
              cur += step;
              if (cur >= target) {
                cur = target;
                clearInterval(iv);
              }
              span.textContent = Math.round(cur) + suffix;
            }, 30);
          }
        });
      },
      { threshold: 0.5 }
    ).observe(numEl);
  });
}

/* ---------- Capability Accordion ---------- */
function initAccordion() {
  document.querySelectorAll('.cap-row').forEach((row) => {
    row.addEventListener('click', () => {
      const wasOpen = row.classList.contains('open');
      document.querySelectorAll('.cap-row').forEach((r) => r.classList.remove('open'));
      if (!wasOpen) row.classList.add('open');
    });
  });
}

/* ---------- Process Line Fill ---------- */
function initProcessLine() {
  const processTrack = document.getElementById('processTrack');
  const processFill = document.getElementById('processFill');
  if (!processTrack || !processFill) return;

  if (prefersReducedMotion) {
    processFill.style.width = '100%';
    return;
  }

  new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) processFill.style.width = '100%';
      });
    },
    { threshold: 0.4 }
  ).observe(processTrack);
}

/* ---------- Hero Parallax for Float Cards ---------- */
function initHeroParallax() {
  const heroVisual = document.getElementById('heroVisual');
  if (!heroVisual || prefersReducedMotion) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroVisual.querySelectorAll('.float-card').forEach((card) => {
      const depth = parseFloat(card.dataset.depth) || 10;
      card.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  });
}

/* ---------- Magnetic Button Effect ---------- */
function initMagnetic() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

/* ---------- Testimonial Carousel ---------- */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testi-slide');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  if (!slides.length || !prevBtn || !nextBtn) return;

  let ti = 0;

  function showSlide(i) {
    slides.forEach((s) => s.classList.remove('active'));
    slides[i].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    ti = (ti + 1) % slides.length;
    showSlide(ti);
  });

  prevBtn.addEventListener('click', () => {
    ti = (ti - 1 + slides.length) % slides.length;
    showSlide(ti);
  });
}

/* ---------- Init All ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initAccordion();
  initProcessLine();
  initHeroParallax();
  initMagnetic();
  initTestimonialCarousel();
});
