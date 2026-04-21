// =====================================================
// JAVASCRIPT DEL SITIO
// =====================================================

// ----- 1. NAVBAR: se oscurece al hacer scroll -----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ----- 2. MENÚ HAMBURGUESA (para móvil) -----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Abrir/cerrar menú al hacer clic en el ícono
hamburger.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en cualquier link del menú móvil
mobileLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
  });
});


// ----- 3. SCROLL SUAVE a las secciones -----
// (esto ya está manejado por CSS con scroll-behavior: smooth)
// Pero lo reforzamos acá para mayor compatibilidad:
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});


// ----- 4. ANIMACIÓN DE ENTRADA al hacer scroll -----
// Los elementos aparecen suavemente cuando el usuario llega a ellos
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

// Aplicamos la observación a estas clases
document.querySelectorAll('.card, .step, .info-box, .credential-item').forEach(function (el) {
  el.classList.add('fade-in-on-scroll');
  observer.observe(el);
});

// CSS para la animación (la inyectamos desde JS para mantener todo junto)
const style = document.createElement('style');
style.textContent = `
  .fade-in-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
