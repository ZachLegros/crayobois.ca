import React from 'react';
import './nav.css';
import Cart from '../cart/cart';
import logo from './logo.png';

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

  if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("Edge") != -1) {
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

/*Toggle*/
var toggled = false;

  function toggle() {
  const tabs = document.getElementById("mobile-tabs");
  const logo = document.getElementsByClassName("logo");
  const basket = document.getElementsByClassName("basket");

  if (toggled == false) {
    tabs.style.opacity = "1";
    tabs.style.transform = "translate(0, 0)";
    logo[1].style.opacity = "0";
    basket[1].style.transform = "translateX(75px)";
    toggled = true;
    linesTrans(toggled);
    setTimeout(function() {
      linesRot(toggled);
    }, 250);
  } else {
    toggled = false;
    tabs.style.opacity = "0";
    tabs.style.transform = "translate(100%, 0)";
    logo[1].style.opacity = "1";
    basket[1].style.transform = "translateX(0px)";
    linesRot(toggled);
    setTimeout(function() {
      linesTrans(toggled);
    }, 250);
  }
}

function linesTrans(toggled) {
  var line1 = document.getElementById("line1");
  var line2 = document.getElementById("line2");

  if (toggled == true) {
    line1.style.transform = "translateY(5.5px) rotate(0)";
    line2.style.transform = "translateY(-5.5px) rotate(0)";
  } else {
    line1.style.transform = "translateY(0) rotate(0)";
    line2.style.transform = "translateY(0) rotate(0)";
  }
}

function linesRot(toggled) {
  var line1 = document.getElementById("line1");
  var line2 = document.getElementById("line2");

  if (toggled == true) {
    line1.style.transform = "translateY(5.5px) rotate(-315deg)";
    line2.style.transform = "translateY(-5.5px) rotate(-225deg)";
  } else {
    line1.style.transform = "translateY(5.5px) rotate(0)";
    line2.style.transform = "translateY(-5.5px) rotate(0)";
  }
}

/*component */
function Nav(props) {
  return (
    <React.Fragment>
      <nav>
        <div className="navbar d-active" style={{backgroundColor: props.color}}>
          <div className="navbar-content">
            <a className="logo-anchor" href="/"><img className="logo" src={logo} alt="Crayobois logo"/></a>
            <ul className="nav-links">
              {props.links.map((link) => {
                return <li key={link.id}><a className="nav-link" href={link.path} key={link.id}>{link.text}</a></li>
              })}
              <li><a className="basket"><Cart /></a></li>
            </ul>
          </div>
        </div>
        <div className="navbar m-active" style={{backgroundColor: props.color}}>
          <div className="navbar-content">
            <div className="ham" onClick={toggle}>
              <span id="line1" className="menu-lines"></span>
              <span id="line2" className="menu-lines"></span>
            </div>
            <a className="logo-anchor" href="/"><img className="logo" src={logo} alt="Crayobois logo"/></a>
            <a className="basket"><Cart /></a>
          </div>
        </div>
      </nav>
      <div id="mobile-tabs">
        <ul className="mobile-nav-links">
          {props.links.map((link) => {
            return <li key={link.id}><a className="mobile-nav-link" href={link.path} key={link.id}>{link.text}</a></li>
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Nav;
