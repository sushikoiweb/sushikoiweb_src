/*
script: popup.js
description: Simple popup slider for use with hamburger menu
by: Reginald Hunt
date: 2018-07-13
*/
var hamburgerMenu = document.getElementById("hamburger_menu"); // the hamburger menu

var popupMenu = document.querySelector("#popup_menu"); // the popup menu

var popupX = document.querySelector("#close"); // the popup close link

var popupTimer = null; // name for the timer

var increments; //the value added or subtracted from the popup position

var speed = 1; //how many pixels to move the popup per timer interval

var popupWidth;
var speed;
/*
When hamburger is clicked, timer runs function to slide open popup menu
*/

var expand_popup = function (e) {
  e.preventDefault();
  popupWidth = Math.floor(popupMenu.offsetWidth);
  popupMenu.style.left = 0 - popupWidth + "px";
  increments = popupMenu.offsetLeft;
  popupMenu.style.display = "block";
  speed = 10;
  popupTimer = window.setInterval(function () {
    slidePopup(true);
  }, 10);
};
/*
When menu close link is clicked, timer runs function to slide closed popup menu
*/


var contract_popup = function (e) {
  e.preventDefault();
  popupWidth = Math.floor(popupMenu.offsetWidth);
  increments = 0;
  speed = 10;
  popupTimer = window.setInterval(function () {
    slidePopup(false);
  }, 10);
};
/*
Function called by timer.
Parameter 'openPopup' sets whether to open or close popup
*/


var slidePopup = function (openPopup) {
  if (openPopup) {
    increments += speed;

    if (increments < 0) {
      popupMenu.style.left = increments + "px"; //move popup right
    } else {
      popupMenu.style.left = "0px"; //make sure final position is 0

      window.clearInterval(popupTimer); // stop move
    }
  } else {
    increments -= speed;
    popupMenu.style.left = increments + "px"; // move popup left

    if (increments <= 0 - popupWidth) {
      window.clearInterval(popupTimer); // stop move
    }
  }
};

hamburgerMenu.addEventListener("click", function (e) {
  expand_popup(e);
}); // make hambunerger menu clickable

popupX.addEventListener("click", function (e) {
  contract_popup(e);
}); // make popup close link clickable