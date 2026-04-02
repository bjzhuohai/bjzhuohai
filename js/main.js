document.addEventListener('DOMContentLoaded', function () {
  var now = new Date();
  var yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(function (el) {
    el.textContent = now.getFullYear();
  });

  var navLinks = document.querySelectorAll('nav a');
  var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
  navLinks.forEach(function (a) {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
});
