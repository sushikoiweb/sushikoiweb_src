var hamburger = document.getElementById('hamburger_menu');
var menuWrap = document.getElementById('menu_wrap');
hamburger.addEventListener('click', function (e) {
  e.preventDefault();
  menuWrap.classList.toggle('full');
  hamburger.classList.toggle('clicked');
});