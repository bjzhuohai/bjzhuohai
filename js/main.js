document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Logic
  const menuBtn = document.createElement('button');
  menuBtn.className = 'menu-toggle';
  menuBtn.innerHTML = '<span></span><span></span><span></span>';
  menuBtn.setAttribute('aria-label', 'Toggle Navigation');

  const navWrap = document.querySelector('.nav-wrap');
  const navLinks = document.querySelector('.nav-links');

  if (navWrap && navLinks) {
    navWrap.appendChild(menuBtn);

    // Create Overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) toggleMenu();
      });
    });
  }

  // Active Link Logic
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Year Logic
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('invalid');
          isValid = false;
        } else {
          input.classList.remove('invalid');

          if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              input.classList.add('invalid');
              isValid = false;
            }
          }
        }
      });

      if (isValid) {
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Sending...';

        // Simulate API call
        setTimeout(() => {
          btn.textContent = 'Message Sent!';
          btn.style.backgroundColor = '#27ae60';
          contactForm.reset();
          setTimeout(() => {
            btn.disabled = false;
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
          }, 3000);
        }, 1500);
      }
    });

    // Remove invalid class on input
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => input.classList.remove('invalid'));
    });
  }
});
