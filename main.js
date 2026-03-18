/* VYBE PORTFOLIO — MAIN JS */

// Mobile burger
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    const [s1, s2] = burger.querySelectorAll('span');
    s1.style.transform = open ? 'rotate(45deg) translate(5px, 4px)' : '';
    s2.style.transform = open ? 'rotate(-45deg) translate(5px, -4px)' : '';
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => s.style.transform = '');
  }));
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationPlayState = 'running';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.panel-inner, .profile-card, .hero-photo-wrap, .right-bottom, .video-card, .video-featured, .dc, .skill-tile'
).forEach((el, i) => {
  el.style.animationDelay = (i * 0.06) + 's';
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Design filter
document.querySelectorAll('.chip-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.dc').forEach(c => {
      c.classList.toggle('hidden', f !== 'all' && c.dataset.cat !== f);
    });
  });
});

// Lightbox
function openLB(card) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lbImg').src = card.querySelector('img').src;
  document.getElementById('lbTag').textContent = card.querySelector('.chip')?.textContent || '';
  document.getElementById('lbTitle').textContent = card.querySelector('h3')?.textContent || '';
  document.getElementById('lbDesc').textContent = card.querySelector('p')?.textContent || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { document.getElementById('lbImg').src = ''; }, 300);
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
