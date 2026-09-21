/* ============================================================
   조성인 안경 — Common JavaScript
============================================================ */
(function () {
  'use strict';

  /* ── Reveal on scroll ── */
  const rvEls = document.querySelectorAll('.rv');
  if (rvEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
    rvEls.forEach(el => obs.observe(el));
  }

  /* ── Navbar scroll ── */
  const nav = document.getElementById('nav');
  const sBar = document.getElementById('stickyBar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
      if (sBar) sBar.classList.toggle('on', window.scrollY > 300);
    }, { passive: true });
  }

  /* ── Active nav link (current page) ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('act');
  });

  /* ── Hamburger / Drawer ── */
  const hbg = document.getElementById('hbg');
  const drw = document.getElementById('drawer');
  const drwBd = document.getElementById('drawerBd');
  const drwClose = document.getElementById('drawerClose');

  function openDrawer() {
    drw.classList.add('open'); drwBd.classList.add('open');
    hbg.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drw.classList.remove('open'); drwBd.classList.remove('open');
    hbg.classList.remove('open'); document.body.style.overflow = '';
  }
  if (hbg) hbg.addEventListener('click', () => drw.classList.contains('open') ? closeDrawer() : openDrawer());
  if (drwClose) drwClose.addEventListener('click', closeDrawer);
  if (drwBd) drwBd.addEventListener('click', closeDrawer);
  window.closeDrawer = closeDrawer;

  /* ── Modal ── */
  const modal = document.getElementById('modal');
  function openModal() {
    if (!modal) return;
    modal.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open'); document.body.style.overflow = '';
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  window.openModal = openModal;
  window.closeModal = closeModal;

  /* ── Smooth scroll for in-page anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 72), behavior: 'smooth' }); }
    });
  });
})();
