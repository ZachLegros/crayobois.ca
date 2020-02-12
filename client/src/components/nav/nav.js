import React, { useState, useContext, useEffect } from "react";
import "./nav.css";
import User from "../userIcon/userIcon";
import logo from "./logo.png";
import NavContext from "../context/navLinksContext";
import AuthContext from "../context/authContext";
import { withRouter } from "react-router-dom";
const uuidv4 = require("uuid/v4");

const Nav = props => {
  const context = useContext(NavContext);
  const authContext = useContext(AuthContext);
  const [userNav, setUserNav] = authContext.userNav;
  const [navigation, setNavigation] = context.navigation;
  const [color, setColor] = useState(null);
  const navLinks = [
    { id: uuidv4(), text: "Accueil", path: "/" },
    { id: uuidv4(), text: "Galerie", path: "/" },
    { id: uuidv4(), text: "Créez votre stylo", path: "/creez-votre-stylo" },
    { id: uuidv4(), text: "Contact", path: "/contact" }
  ];

  /*Toggle hamburger*/
  let toggled = false;

  function toggle() {
    const tabs = document.getElementById("mobile-tabs");
    const logo = document.getElementsByClassName("logo");

    if (toggled === false) {
      tabs.style.opacity = "1";
      tabs.style.transform = "translate(0, 0)";
      logo[1].style.opacity = "0";
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
      linesRot(toggled);
      setTimeout(function() {
        linesTrans(toggled);
      }, 250);
    }
  }

  function linesTrans(toggled) {
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");

    if (toggled === true) {
      line1.style.transform = "translateY(5.5px) rotate(0)";
      line2.style.transform = "translateY(-5.5px) rotate(0)";
    } else {
      line1.style.transform = "translateY(0) rotate(0)";
      line2.style.transform = "translateY(0) rotate(0)";
    }
  }

  function linesRot(toggled) {
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");

    if (toggled === true) {
      line1.style.transform = "translateY(5.5px) rotate(-315deg)";
      line2.style.transform = "translateY(-5.5px) rotate(-225deg)";
    } else {
      line1.style.transform = "translateY(5.5px) rotate(0)";
      line2.style.transform = "translateY(-5.5px) rotate(0)";
    }
  }

  let prevScroll = 0;

  function stickyNav() {
    const nav = document.querySelector(".navbar");
    let scroll = window.pageYOffset || document.documentElement.scrollTop;
    const width = window.pageXOffset || document.documentElement.clientWidth;

    if (width > 850 && navigation === "home") {
      if (scroll < 40) {
        setColor(null);
        prevScroll = scroll;
      } else {
        setColor("var(--black)");
        prevScroll = scroll;
      }
    } else {
    }
  }

  useEffect(() => {
    if (navigation === "home") {
      window.addEventListener("scroll", stickyNav);
      let nav = document.querySelector(".navbar");
      nav.classList.remove("black-nav");
    } else {
      let nav = document.querySelector(".navbar");
      nav.classList.add("black-nav");
    }
  }, [navigation]);

  return (
    <React.Fragment>
      <nav>
        <div
          className={color ? "navbar d-active black-nav" : "navbar d-active"}
        >
          <div className="navbar-content">
            <div className="navbar-left">
              <span
                className="logo-anchor"
                onClick={() => {
                  props.history.push("/");
                  setNavigation("home");
                }}
              >
                <img className="logo" src={logo} />
              </span>
              <ul className="nav-links">
                {navLinks.map(link => {
                  return (
                    <li key={link.id}>
                      <span
                        className="nav-link"
                        onClick={() => {
                          props.history.push(link.path);
                          setNavigation("home");
                        }}
                        key={link.id}
                      >
                        {link.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="navbar-right">
              <User />
            </div>
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
            <User />
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
          <li>
            <a
              className="mobile-nav-link"
              onClick={() => {
                setUserNav("profile");
              }}
              href="/utilisateur"
            >
              mon compte <i className="fas fa-user nav-user-icons"></i>
            </a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Nav);
