import React from "react";
import "./nav.css";
import Cart from "../cart/cart";
import logo from "./logo.png";
const uuidv4 = require("uuid/v4");

function Nav() {
  /*navColor */
  window.addEventListener("load", navColor);

  function navColor() {
    const nav = document.getElementsByClassName("navbar");

    if (
      navigator.userAgent.indexOf("MSIE") !== -1 ||
      navigator.userAgent.indexOf("Edge") !== -1
    ) {
      nav[0].style.backgroundColor = "var(--black)";
    } 
  }

  /*Toggle*/
  var toggled = false;

  function toggle() {
    const tabs = document.getElementById("mobile-tabs");
    const logo = document.getElementsByClassName("logo");
    const basket = document.getElementsByClassName("basket");

    if (toggled === false) {
      tabs.style.opacity = "1";
      tabs.style.transform = "translate(0, 0)";
      logo[1].style.opacity = "0";
      basket[1].style.opacity = "0";
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
      basket[1].style.opacity = "1";
      linesRot(toggled);
      setTimeout(function() {
        linesTrans(toggled);
      }, 250);
    }
  }

  function linesTrans(toggled) {
    var line1 = document.getElementById("line1");
    var line2 = document.getElementById("line2");

    if (toggled === true) {
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

    if (toggled === true) {
      line1.style.transform = "translateY(5.5px) rotate(-315deg)";
      line2.style.transform = "translateY(-5.5px) rotate(-225deg)";
    } else {
      line1.style.transform = "translateY(5.5px) rotate(0)";
      line2.style.transform = "translateY(-5.5px) rotate(0)";
    }
  }

  const navLinks = [
    { id: uuidv4(), text: "Accueil", path: "/" },
    { id: uuidv4(), text: "Galerie", path: "/" },
    { id: uuidv4(), text: "Créez votre stylo", path: "/creez-votre-stylo" },
    { id: uuidv4(), text: "Contact", path: "/" }
  ];

  return (
    <React.Fragment>
      <nav>
        <div
          className="navbar d-active"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="navbar-content">
            <a className="logo-anchor" href="/">
              <img className="logo" src={logo} alt="Crayobois logo" />
            </a>
            <ul className="nav-links">
              {navLinks.map((link) => {
                return (
                  <li key={link.id}>
                    <a className="nav-link" href={link.path} key={link.id}>
                      {link.text}
                    </a>
                  </li>
                );
              })}
              <li>
                <a className="basket" href="/">
                  <Cart />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="navbar m-active"
          style={{ backgroundColor: "var(--black)" }}
        >
          <div className="navbar-content">
            <div id="ham" onClick={toggle}>
              <span id="line1" className="menu-lines"></span>
              <span id="line2" className="menu-lines"></span>
            </div>
            <a className="logo-anchor" href="/">
              <img className="logo" src={logo} alt="Crayobois logo" />
            </a>
            <a className="basket" href="/">
              <Cart />
            </a>
          </div>
        </div>
      </nav>
      <div id="mobile-tabs">
        <ul className="mobile-nav-links">
          {navLinks.map(link => {
            return (
              <li key={link.id}>
                <a className="mobile-nav-link" href={link.path} key={link.id}>
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Nav;
