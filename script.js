// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function setTheme(mode){
  if(mode === 'dark'){
    root.setAttribute('data-theme','dark');
    themeToggle.setAttribute('aria-pressed','true');
  } else {
    root.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed','false');
  }
}

// respect system preference on first load (no persistence available in this sandboxed preview)
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(prefersDark ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  setTheme(isDark ? 'light' : 'dark');
});

// ============ MOBILE NAV ============
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
  });
});

// ============ SCROLL REVEAL ============
const revealTargets = document.querySelectorAll(
  '.about-copy, .about-visual, .program-card, .impact-stat, .polaroid, .team-copy, .founder-card, .contact-grid > div, .contact-form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ============ ANIMATED COUNTERS ============
function animateCount(el){
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString('en-IN') + suffix;
    if(progress < 1){
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString('en-IN') + suffix;
    }
  }
  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

counters.forEach(el => counterObserver.observe(el));

// ============ CONTACT FORM (demo only) ============
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = "Thanks — this is a demo form, so nothing was actually sent. Wire it up to a backend or form service to go live.";
  contactForm.reset();
});
