/* Accessible, defensive navigation and reveal enhancements */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var button = document.getElementById('mobile-menu-button');
  var menu = document.getElementById('mobile-menu');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setMenu(open) {
    if (!button || !menu) return;
    menu.classList.toggle('hidden', !open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.style.opacity = open ? '1' : '0';
    menu.style.transform = open ? 'translateY(0)' : 'translateY(-16px)';
  }
  if (button && menu) {
    button.setAttribute('aria-controls', 'mobile-menu');
    button.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
    button.addEventListener('click', function () { setMenu(menu.classList.contains('hidden')); });
    menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.classList.contains('hidden')) { setMenu(false); button.focus(); }
    });
    document.addEventListener('click', function (event) {
      if (!menu.classList.contains('hidden') && !menu.contains(event.target) && !button.contains(event.target)) setMenu(false);
    });
  }
  var fadeEls = document.querySelectorAll('.fade-in, .team-card');
  if (!fadeEls.length) return;
  if (!('IntersectionObserver' in window) || reduceMotion) {
    fadeEls.forEach(function (el) { el.style.animationPlayState = 'running'; el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.style.animationPlayState = 'running'; observer.unobserve(entry.target); }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });
  fadeEls.forEach(function (el) { el.style.animationPlayState = 'paused'; observer.observe(el); });
});
