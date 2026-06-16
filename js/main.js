// Star Sailors Guide - Shared JavaScript

// === Stars Background Animation ===
(function() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    const count = Math.floor((canvas.width * canvas.height) / 2800);
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.3,
        opacity: Math.random(),
        speed: Math.random() * 0.008 + 0.003,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      s.opacity += s.twinkleSpeed;
      if (s.opacity > 1 || s.opacity < 0.2) s.twinkleSpeed *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,210,255,${s.opacity})`;
      ctx.fill();
    });
    animationId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createStars(); });
  resize();
  createStars();
  draw();
})();

// === Navigation Scroll Effect ===
(function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// === Mobile Nav Toggle ===
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) links.classList.remove('open');
  });
})();

// === Scroll Animation ===
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
})();

// === Active Nav Link ===
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// === Language Switcher ===
function switchLang(lang) {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop() || 'index.html';
  const basePath = path.substring(0, path.lastIndexOf('/') + 1);
  
  if (lang === 'en') {
    window.location.href = '../en/' + currentPage;
  } else if (lang === 'id') {
    window.location.href = '../id/' + currentPage;
  }
}

// === Language Auto-Detect ===
(function() {
  // Only run on root language selector page
  if (window.location.pathname.endsWith('starsailors-guide/') || 
      window.location.pathname.endsWith('starsailors-guide/index.html') ||
      window.location.pathname === '/index.html' ||
      window.location.pathname === '/') {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('id')) {
      window.location.href = 'id/index.html';
    } else {
      // Default to English for all others
      window.location.href = 'en/index.html';
    }
  }
})();