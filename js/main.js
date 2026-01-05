/**
 * Mira Study WF - JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // モバイルメニュー
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuBtn.classList.toggle('is-active');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    // メニュー内のリンクをクリックしたらメニューを閉じる
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuBtn.classList.remove('is-active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
      });
    });
  }

  // スムーススクロール（ヘッダーの高さを考慮）
  const headerHeight = document.querySelector('.header')?.offsetHeight || 70;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });

  // ヘッダーのスクロール時の挙動
  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScroll = currentScroll;
  });

  // サービスアコーディオン
  document.querySelectorAll('.service-accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // 料金タブ切替
  document.querySelectorAll('[data-price-tabs]').forEach(tabContainer => {
    const buttons = tabContainer.querySelectorAll('.price-tabs__btn');
    const contents = tabContainer.querySelectorAll('.price-tabs__content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        // ボタンの状態切替
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // コンテンツの表示切替
        contents.forEach(content => {
          content.classList.toggle('is-active', content.dataset.tabContent === tabId);
        });
      });
    });
  });
});
