
// ─── Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ─── Particles
(function() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;
  const COUNT = 55;
  const COLORS = ['99,102,241','6,182,212','236,72,153'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function init() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
        r: rand(1.2, 2.5),
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          const alpha = (1 - dist/130) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${particles[i].color},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    // Dots
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},0.55)`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    }
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize(); init(); draw();
})();

// ─── Hamburger
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
hamburger.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ─── Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ─── Copy Email
function copyEmail() {
  navigator.clipboard.writeText('arkojit2410@gmail.com').then(() => {
    const toast = document.getElementById('copyToast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
}
document.querySelector('.contact-card.email').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') copyEmail();
});
