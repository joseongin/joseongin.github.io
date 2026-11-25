/* 조성인안경원 — 공통 인터랙션 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-dropdown a, .drawer-link, .drawer-sub-link').forEach(link => {
    if (link.getAttribute('href') !== path) return;
    link.setAttribute('aria-current', 'page');
    const navItem = link.closest('.nav-item');
    if (navItem) navItem.querySelector('.nav-link').classList.add('act');
  });

  const stickyBar = document.getElementById('stickyBar');
  if (stickyBar) {
    const updateBookingBar = () => stickyBar.classList.toggle('on', window.scrollY > 300);
    updateBookingBar();
    window.addEventListener('scroll', updateBookingBar, { passive: true });
  }

  const hamburger = document.getElementById('hbg');
  const drawer = document.getElementById('drawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBd');
  const modal = document.getElementById('modal');
  const modalClose = modal?.querySelector('.modal-close');
  let modalTrigger;

  function setDrawer(open) {
    drawer.inert = !open;
    drawer.classList.toggle('open', open);
    drawerBackdrop.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = open ? 'hidden' : '';
    (open ? drawerClose : hamburger).focus();
  }

  function setModal(open) {
    if (!modal || modal.classList.contains('open') === open) return;
    if (open) modalTrigger = document.activeElement;
    modal.inert = !open;
    modal.classList.toggle('open', open);
    document.body.style.overflow = open || drawer?.classList.contains('open') ? 'hidden' : '';
    (open ? modalClose : modalTrigger)?.focus();
  }

  hamburger?.addEventListener('click', () => setDrawer(drawer.inert));
  drawerClose?.addEventListener('click', () => setDrawer(false));
  drawerBackdrop?.addEventListener('click', () => setDrawer(false));
  modalClose?.addEventListener('click', () => setModal(false));
  modal?.addEventListener('click', event => { if (event.target === modal) setModal(false); });
  const desktop = window.matchMedia('(min-width: 961px)');
  desktop.addEventListener('change', event => {
    if (event.matches && drawer && !drawer.inert) setDrawer(false);
  });

  document.addEventListener('keydown', event => {
    const dialog = modal?.classList.contains('open') ? modal : drawer?.classList.contains('open') ? drawer : null;
    if (!dialog) return;
    if (event.key === 'Escape') {
      if (dialog === modal) setModal(false);
      else setDrawer(false);
      return;
    }
    if (event.key !== 'Tab') return;
    const controls = dialog.querySelectorAll('a[href], button');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey ? document.activeElement === first : document.activeElement === last) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  });

  window.openModal = () => setModal(true);
  window.closeModal = () => setModal(false);
  window.closeDrawer = () => { if (drawer && !drawer.inert) setDrawer(false); };
});
