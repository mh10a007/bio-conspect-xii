// Progress bar
const progressBar = document.getElementById('progressBar');
const backTop = document.getElementById('backTop');
const stickyNavItems = document.querySelectorAll('.sn-item');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';

  // back to top button
  if (scrollTop > 400) backTop.classList.add('visible');
  else backTop.classList.remove('visible');

  // sticky nav active state
  sections.forEach(sec => {
    const top = sec.offsetTop - 200;
    const bottom = top + sec.offsetHeight;
    if (scrollTop >= top && scrollTop < bottom) {
      stickyNavItems.forEach(item => {
        item.classList.toggle('active', item.dataset.target === sec.id);
      });
    }
  });
});

// Back to top
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// Animated counter for hero section
function animateNumber(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

// Chapter card hover depth effect
document.querySelectorAll('.topic-block').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
