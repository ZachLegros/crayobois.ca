/*Parallax and navColor */

window.addEventListener('scroll', scrollEventHandler);
window.addEventListener('load', loadEventHandler);

function loadEventHandler() {
  navColor();
  parallax();
}

function scrollEventHandler() {
  navColor();
  parallax();
}

function navColor() {
  const nav = document.getElementsByClassName("navbar");
  var scrollValue = document.documentElement.scrollTop;

  if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.indexOf("Edge") !== -1) {
    nav[0].style.backgroundColor = "var(--black)";
  }
  else if (nav[0].classList.contains("black")) {
    nav[0].style.backgroundColor = "var(--black)";

  }
  else if (scrollValue > 90) {
    nav[0].style.backgroundColor = "var(--black)";
  }
  else {
    nav[0].style.backgroundColor = "transparent";
  }
}

function parallax() {
  const img = document.getElementById('landing-wrapper');
  const scrollValue = document.documentElement.scrollTop;
  const height = img.offsetHeight;
  const landing_block = document.getElementById('landing-txt');
  const btn = document.getElementsByClassName('btn');
  const opacity = 1 - (scrollValue / (height / 2)) + 0.25;
  
  if (scrollValue <= height) {
      img.style.backgroundPositionY = ((scrollValue) - (scrollValue * 0.6)) + "px";
      landing_block.style.opacity = opacity;
      btn[0].style.opacity = opacity;
  }
}