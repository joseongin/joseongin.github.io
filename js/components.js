/* ============================================================
   공통 컴포넌트 주입 — v2 (English Nav + Dropdown + No Nav CTA)
============================================================ */
(function () {

  /* ── NAV HTML (영문 + 드롭다운) ── */
  const NAV_HTML = `
<header class="nav" id="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <span class="nav-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 62 34" fill="none" stroke="#0a1c33" stroke-width="2.6" stroke-linecap="round">
          <circle cx="15" cy="19" r="11"/>
          <circle cx="47" cy="19" r="11"/>
          <path d="M26 16 Q31 12 36 16"/>
          <path d="M4 13 Q6 7 12 8" stroke-width="2.2"/>
          <path d="M58 13 Q56 7 50 8" stroke-width="2.2"/>
        </svg>
      </span>
      <span class="nav-logo-txt">
        <span class="nav-logo-main">조성인 안경</span>
        <span class="nav-logo-sub">JOSEONGIN OPTICAL · DAEJEON</span>
      </span>
    </a>

    <nav class="nav-links" role="navigation">

      <div class="nav-item">
        <a href="index.html" class="nav-link">Home</a>
      </div>

      <div class="nav-item">
        <a href="about.html" class="nav-link">About</a>
      </div>

      <div class="nav-item">
        <a href="equipment.html" class="nav-link">
          Equipment <span class="nav-arrow">&#9660;</span>
        </a>
        <div class="nav-dropdown">
          <span class="dd-label">Equipment</span>
          <a href="eq-zeiss.html">ZEISS i.Profiler&#174;</a>
          <a href="eq-trial.html">근난시 통합 트라이얼 렌즈</a>
          <a href="eq-experience.html">체험형 시스템</a>
        </div>
      </div>

      <div class="nav-item">
        <a href="services.html" class="nav-link">
          Specialized Optical Care <span class="nav-arrow">&#9660;</span>
        </a>
        <div class="nav-dropdown">
          <span class="dd-label">Specialized Optical Care</span>
          <a href="svc-optometry.html">정밀검안</a>
          <a href="svc-progressive.html">누진다초점</a>
          <a href="svc-highpower.html">고도수 안경</a>
          <a href="svc-fitting.html">맞춤형 피팅</a>
        </div>
      </div>

      <div class="nav-item">
        <a href="cases.html" class="nav-link">Case Studies</a>
      </div>

      <div class="nav-item">
        <a href="contact.html" class="nav-link">Contact</a>
      </div>

    </nav>

    <button class="hamburger" id="hbg" aria-label="메뉴 열기">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="drawer" id="drawer" role="dialog" aria-label="모바일 메뉴">
  <div class="drawer-inner">
    <button class="drawer-close" id="drawerClose" aria-label="닫기">&#10005;</button>

    <a href="index.html" class="drawer-link">Home</a>
    <a href="about.html" class="drawer-link">About</a>

    <a href="equipment.html" class="drawer-link">Equipment</a>
    <a href="eq-zeiss.html"      class="drawer-sub-link">&#8627; ZEISS i.Profiler&#174;</a>
    <a href="eq-trial.html"      class="drawer-sub-link">&#8627; 근난시 통합 트라이얼 렌즈</a>
    <a href="eq-experience.html" class="drawer-sub-link">&#8627; 체험형 시스템</a>

    <a href="services.html" class="drawer-link">Specialized Optical Care</a>
    <a href="svc-optometry.html"  class="drawer-sub-link">&#8627; 정밀검안</a>
    <a href="svc-progressive.html" class="drawer-sub-link">&#8627; 누진다초점</a>
    <a href="svc-highpower.html"  class="drawer-sub-link">&#8627; 고도수 안경</a>
    <a href="svc-fitting.html"   class="drawer-sub-link">&#8627; 맞춤형 피팅</a>

    <a href="cases.html"  class="drawer-link">Case Studies</a>
    <a href="contact.html" class="drawer-link">Contact</a>

    <a href="https://m.booking.naver.com/booking/13/bizes/819206/items/4948017?area=bmp&lang=ko&service-target=map-pc&startDate=2026-05-18&theme=place"
       target="_blank" class="drawer-cta">예약하기</a>
  </div>
</div>
<div class="drawer-bd" id="drawerBd"></div>`;

  /* ── FOOTER HTML ── */
  const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-top">
    <div class="footer-top-in">
      <div>
        <p class="footer-brand-name">조성인 안경</p>
        <p class="footer-brand-sub">Clinical Precision &amp; Mastery<br>임상 전문성과 정밀함의 차이</p>
      </div>
      <div class="footer-info">
        <p>대전광역시 서구 둔산북로 22, 153&#183;154호 (둔산동 꽃시장 1층)</p>
        <p>Tel. 0507-1439-0078 &nbsp;|&nbsp; 월요일 정기 휴무</p>
        <p style="margin-top:8px;">화~금 10:00—19:30 &nbsp;·&nbsp; 토~일 10:00—19:00 &nbsp;|&nbsp; 지상 150대 주차</p>
      </div>
      <div class="footer-links">
        <a href="https://blog.naver.com/pildo11" target="_blank">Blog</a>
        <a href="https://www.instagram.com/joseongin_glasses/" target="_blank">Instagram</a>
        <a href="https://talk.naver.com/ct/w5uyll?frm=pblog#nafullscreen" target="_blank">Naver Talk</a>
        <a href="http://map.naver.com/p/entry/place/1694854628" target="_blank">Naver Map</a>
      </div>
    </div>
  </div>
  <div class="footer-bot">
    <p>&#169; 2026 조성인 안경. All rights reserved.</p>
  </div>
</footer>`;

  /* ── FLOATING (네이버 예약 단일) ── */
  const FLOAT_HTML = `
<div class="float-group" id="floatG">
  <a href="https://m.booking.naver.com/booking/13/bizes/819206/items/4948017?area=bmp&lang=ko&service-target=map-pc&startDate=2026-05-18&theme=place"
     target="_blank" class="float-main" title="네이버 예약하기">
    <span class="float-main-ico">N</span>
    <span class="float-main-lbl">예약</span>
  </a>
</div>`;

  /* ── STICKY BAR ── */
  const STICKY_HTML = `
<div class="sticky-bar" id="stickyBar">
  <div class="sticky-bar-in">
    <div class="sticky-bar-txt">
      <strong>조성인 안경</strong>
      <span>정밀한 시력검사 · 0507-1439-0078</span>
    </div>
    <a href="https://m.booking.naver.com/booking/13/bizes/819206/items/4948017?area=bmp&lang=ko&service-target=map-pc&startDate=2026-05-18&theme=place"
       target="_blank" class="sticky-bar-btn">예약하기</a>
  </div>
</div>`;

  /* ── MODAL (네이버 예약 단일 채널) ── */
  const MODAL_HTML = `
<div class="modal" id="modal" onclick="if(event.target===this)closeModal()">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()" aria-label="닫기">&#10005;</button>
    <div class="modal-hd">
      <span class="modal-tag">RESERVATION</span>
      <h3>네이버로 예약하기</h3>
      <p>원하시는 날짜와 시간을 선택하면 즉시 예약이 완료됩니다</p>
    </div>
    <div class="modal-opts">
      <a href="https://m.booking.naver.com/booking/13/bizes/819206/items/4948017?area=bmp&lang=ko&service-target=map-pc&startDate=2026-05-18&theme=place"
         target="_blank" class="modal-opt opt-naver">
        <div class="modal-opt-l">
          <span class="modal-opt-ico">N</span>
          <div><strong>네이버 예약</strong><small>날짜·시간 선택 후 즉시 예약</small></div>
        </div><span class="modal-arr">&#8594;</span>
      </a>
    </div>
    <div class="modal-foot">
      <p>전화 문의 0507-1439-0078</p>
      <p>화~금 10:00—19:30 &nbsp;·&nbsp; 토~일 10:00—19:00 &nbsp;|&nbsp; 월요일 정기 휴무</p>
    </div>
  </div>
</div>`;

  /* ── TICKER HTML ── */
  const TICKER_HTML = `
<div class="ticker">
  <div class="ticker-track">
    <span>Clinical Precision</span><span class="ticker-dot">&#9670;</span>
    <span>ZEISS i.Profiler&#174;</span><span class="ticker-dot">&#9670;</span>
    <span>정밀검안</span><span class="ticker-dot">&#9670;</span>
    <span>누진다초점 전문</span><span class="ticker-dot">&#9670;</span>
    <span>Optometrist 3rd Gen.</span><span class="ticker-dot">&#9670;</span>
    <span>고도수 안경</span><span class="ticker-dot">&#9670;</span>
    <span>대전보건대 특강 교수</span><span class="ticker-dot">&#9670;</span>
    <span>Fitting Master</span><span class="ticker-dot">&#9670;</span>
    <span>성장기 근시 억제</span><span class="ticker-dot">&#9670;</span>
    <span>임상 전문성</span><span class="ticker-dot">&#9670;</span>
    <span>Clinical Precision</span><span class="ticker-dot">&#9670;</span>
    <span>ZEISS i.Profiler&#174;</span><span class="ticker-dot">&#9670;</span>
    <span>정밀검안</span><span class="ticker-dot">&#9670;</span>
    <span>누진다초점 전문</span><span class="ticker-dot">&#9670;</span>
    <span>Optometrist 3rd Gen.</span><span class="ticker-dot">&#9670;</span>
    <span>고도수 안경</span><span class="ticker-dot">&#9670;</span>
    <span>대전보건대 특강 교수</span><span class="ticker-dot">&#9670;</span>
    <span>Fitting Master</span><span class="ticker-dot">&#9670;</span>
    <span>성장기 근시 억제</span><span class="ticker-dot">&#9670;</span>
    <span>임상 전문성</span><span class="ticker-dot">&#9670;</span>
  </div>
</div>`;

  /* ── Inject ── */
  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
    const tickerSlot = document.getElementById('ticker-slot');
    if (tickerSlot) tickerSlot.outerHTML = TICKER_HTML;
    document.body.insertAdjacentHTML('beforeend',
      FLOAT_HTML + STICKY_HTML + MODAL_HTML + FOOTER_HTML
    );

    /* ── Custom Cursor ── */
    initCustomCursor();
  });

  function initCustomCursor() {
    // 터치 디바이스 / 마우스 없는 환경에서는 건너뜀
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    // 커서 요소 생성
    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    const dot  = document.createElement('div');
    dot.id  = 'cursor-dot';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let mx = -200, my = -200;    // 마우스 실제 위치
    let rx = -200, ry = -200;    // ring 현재 위치 (래그)
    let raf;

    // 링은 래그를 두어 부드럽게 따라오게
    function animateRing() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';

      // 다크 배경(히어로) 판단
      const el = document.elementFromPoint(mx, my);
      if (el) {
        const hero = el.closest('.hero, .page-hero, .page-sec--dark, .cta-sec');
        document.body.classList.toggle('cursor-on-dark', !!hero);
      }
    });

    document.addEventListener('mousedown', function () {
      document.body.classList.add('cursor-clicking');
    });
    document.addEventListener('mouseup', function () {
      document.body.classList.remove('cursor-clicking');
    });

    // 링크·버튼 호버
    const hoverSel = 'a, button, [role="button"], label, select, .btn, .nav-link, .float-main, .float-sub, .why-card, .intro-card, .case-prev-card';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverSel)) {
        document.body.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverSel)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    // 텍스트 입력 필드
    document.addEventListener('mouseover', function (e) {
      if (e.target.matches('input[type="text"], input[type="email"], input[type="tel"], textarea')) {
        document.body.classList.add('cursor-text');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.matches('input[type="text"], input[type="email"], input[type="tel"], textarea')) {
        document.body.classList.remove('cursor-text');
      }
    });

    // 페이지 벗어날 때 커서 숨김
    document.addEventListener('mouseleave', function () {
      ring.style.opacity = '0';
      dot.style.opacity  = '0';
    });
    document.addEventListener('mouseenter', function () {
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    });
  }

})();
