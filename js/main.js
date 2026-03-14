// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 80);
}, { passive: true });

// ===== MOBILE NAV =====
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  links.classList.toggle('nav__links--open');
});
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('nav__links--open'));
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('reveal--visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const items = document.querySelectorAll('.portfolio__item');
let currentIndex = 0;
const images = Array.from(items).map(item => item.querySelector('img').src);

items.forEach((item) => {
  item.addEventListener('click', () => {
    currentIndex = parseInt(item.dataset.index);
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  lightboxImg.src = images[index];
  lightbox.classList.add('lightbox--active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('lightbox--active');
  document.body.style.overflow = '';
}

document.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.querySelector('.lightbox__prev').addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
});

document.querySelector('.lightbox__next').addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('lightbox--active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + images.length) % images.length; lightboxImg.src = images[currentIndex]; }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % images.length; lightboxImg.src = images[currentIndex]; }
});
