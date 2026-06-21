/* script.js */
'use strict';

/* ===== Loader ===== */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 1200);
});

/* ===== Custom Cursor ===== */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .about-tags li, .work-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

/* ===== Navbar scroll + Burger ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

/* ===== Reveal on scroll ===== */
const revealEls = document.querySelectorAll('.reveal');
const revObserver = new IntersectionObserver((entries) => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('show'), i * 80);
      revObserver.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revObserver.observe(el));

/* ===== Skill bars ===== */
const skills = document.querySelectorAll('.skill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const bar = en.target.querySelector('.skill-bar span');
      bar.style.width = en.target.dataset.skill + '%';
      skillObserver.unobserve(en.target);
    }
  });
}, { threshold: 0.4 });
skills.forEach(s => skillObserver.observe(s));

/* ===== Counter animation ===== */
const counters = document.querySelectorAll('.stat-num');
const toFa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const el = en.target;
      const target = +el.dataset.target;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        cur += step;
        if (cur >= target) { el.textContent = toFa(target); }
        else { el.textContent = toFa(cur); requestAnimationFrame(tick); }
      };
      tick();
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

/* ===== Embers / Particle background ===== */
const canvas = document.getElementById('embers');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticles() {
  particles = [];
  const count = Math.floor(window.innerWidth / 18);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      sy: Math.random() * 0.7 + 0.2,
      sx: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.6 + 0.2
    });
  }
}
createParticles();
window.addEventListener('resize', createParticles);

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(225,6,0,${p.a})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(255,26,26,.8)';
    ctx.fill();
    p.y -= p.sy;
    p.x += p.sx;
    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== Work play buttons (demo feedback) ===== */
document.querySelectorAll('.work-play').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent;
    btn.textContent = '♪ در حال پخش...';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2200);
  });
});

/* ===== Contact form ===== */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  if (!name) return;
  status.textContent = 'در حال ارسال...';
  setTimeout(() => {
    status.textContent = `ممنون ${name}! پیامت دریافت شد. به‌زودی پاسخ می‌دم. 🔥`;
    form.reset();
    setTimeout(() => status.textContent = '', 5000);
  }, 1000);
});

/* ===== Hero parallax glow follows mouse ===== */
const heroGlow = document.querySelector('.hero-glow');
document.querySelector('.hero').addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});
