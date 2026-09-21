/* ============================================================
   조성인 안경 — Main JavaScript
   Premium Clinical Optical
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────
   1. Reveal on scroll (IntersectionObserver)
────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ──────────────────────────────────────────
   2. Navbar scroll effects
────────────────────────────────────────── */
const nav      = document.getElementById('nav');
const stickyBar = document.getElementById('stickyBar');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Nav shadow
  nav.classList.toggle('scrolled', scrollY > 60);

  // Sticky bar: show after passing ~60% of hero
  const heroBottom = (heroSection?.offsetHeight ?? 600) * 0.6;
  stickyBar.classList.toggle('visible', scrollY > heroBottom);
}, { passive: true });

/* ──────────────────────────────────────────
   3. Active nav link
────────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
});

sections.forEach(s => sectionObserver.observe(s));

/* ──────────────────────────────────────────
   4. Hamburger / Drawer
────────────────────────────────────────── */
const hamburger     = document.getElementById('hamburger');
const drawer        = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const drawerClose   = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('open');
  drawerBackdrop.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawerClose.addEventListener('click', closeDrawer);

// Expose closeDrawer globally (used in HTML onclick)
window.closeDrawer = closeDrawer;

/* ──────────────────────────────────────────
   5. Modal
────────────────────────────────────────── */
const modal = document.getElementById('modal');

function openModal() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Expose globally
window.openModal  = openModal;
window.closeModal = closeModal;

/* ──────────────────────────────────────────
   6. Smooth scroll for anchor links
────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    const target = href.length > 1 ? document.querySelector(href) : null;
    if (target) {
      e.preventDefault();
      const offset = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ──────────────────────────────────────────
   7. Hero counter animation
────────────────────────────────────────── */
function animateCount(el, target, suffix = '') {
  const duration = 1800;
  const start    = performance.now();
  const isZero   = target === 0;

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(eased * target);

    if (isZero) {
      el.textContent = '0';
    } else {
      el.textContent = current.toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = isZero ? '0' : target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

// Trigger counters when hero stats enter viewport
const heroStats = document.querySelector('.hero__stats');
let countersTriggered = false;

if (heroStats) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersTriggered) {
        countersTriggered = true;
        document.querySelectorAll('.hero__stat-num[data-target]').forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          animateCount(el, target);
        });
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  counterObserver.observe(heroStats);
}

/* ──────────────────────────────────────────
   8. Ticker duplicate check (ensure 2x)
────────────────────────────────────────── */
(function ensureTicker() {
  const track = document.querySelector('.ticker__track');
  if (!track) return;
  // Already has content — the CSS animation handles the seamless loop
})();

/* ──────────────────────────────────────────
   9. Floating group — hide when modal open
────────────────────────────────────────── */
const floatGroup = document.getElementById('floatGroup');

const origOpen  = window.openModal;
const origClose = window.closeModal;

window.openModal = function() {
  origOpen();
  if (floatGroup) floatGroup.style.opacity = '0';
  if (floatGroup) floatGroup.style.pointerEvents = 'none';
};

window.closeModal = function() {
  origClose();
  if (floatGroup) floatGroup.style.opacity = '';
  if (floatGroup) floatGroup.style.pointerEvents = '';
};

/* ──────────────────────────────────────────
   10. Image lazy fallback
────────────────────────────────────────── */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.background = '#e8edf5';
    img.style.minHeight  = '200px';
    img.alt = img.alt || '이미지';
  });
});

console.log('%c조성인 안경', 'color:#0b1f3a;font-size:18px;font-weight:900;');
console.log('%c임상 전문성과 정밀함의 차이', 'color:#c9a96e;font-size:12px;');
