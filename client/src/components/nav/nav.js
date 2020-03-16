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
  const navLinks = [
    { id: uuidv4(), text: "Accueil", path: "/" },
    { id: uuidv4(), text: "Galerie", path: "/galerie" },
    { id: uuidv4(), text: "Créez votre stylo", path: "/creez-votre-stylo" },
    { id: uuidv4(), text: "Contact", path: "/contact" }
  ];
  const [auth, setAuth] = useState(null);

  authContext.isInitialized().then(authState => {
    setAuth(authState);
  });

  /*Toggle hamburger*/
  const [toggled, setToggled] = useState(false);

  function scrollTop() {
    const root = document.getElementById("root");
    window.scrollTo(0,0);
  }

  function toggle() {
    const tabs = document.getElementById("mobile-tabs");
    const logo = document.getElementsByClassName("logo");

    if (toggled === false) {
      tabs.style.opacity = "1";
      tabs.style.transform = "translate(0, 0)";
      logo[1].style.opacity = "0";
      linesTrans(!toggled);
      setTimeout(function() {
        linesRot(!toggled);
      }, 250);
      setToggled(true);
    } else {
      tabs.style.opacity = "0";
      tabs.style.transform = "translate(100%, 0)";
      logo[1].style.opacity = "1";
      linesRot(!toggled);
      setTimeout(function() {
        linesTrans(!toggled);
      }, 250);
      setToggled(false);
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
    let scroll = window.pageYOffset || document.documentElement.scrollTop;
    const width = window.pageXOffset || document.documentElement.clientWidth;
    let nav = document.querySelector(".navbar");

    if (width > 850 && navigation === "/") {
      if (scroll < 40) {
        nav.classList.remove("black-nav");
        prevScroll = scroll;
      } else {
        nav.classList.add("black-nav");
        prevScroll = scroll;
      }
    }
  }

  useEffect(() => {
    const nav = document.querySelector(".navbar");
    if (navigation === "/") {
      window.addEventListener("scroll", stickyNav);
      nav.classList.remove("black-nav");
    } else {
      nav.classList.add("black-nav");
    }
    return () => {
      window.removeEventListener("scroll", stickyNav);
      nav.classList.add("black-nav");
    };
  }, [navigation]);

  return (
    <React.Fragment>
      <nav>
        <div className={"navbar d-active"}>
          <div className="navbar-content">
            <div className="navbar-left">
              <span
                className="logo-anchor"
                onClick={() => {
                  if (navigation !== "/") {
                    props.history.push("/");
                    setNavigation("/");
                    scrollTop();
                  }
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
                          if (navigation !== link.path) {
                            props.history.push(link.path);
                            setNavigation(link.path);
                            scrollTop();
                          }
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
              <User toggle={toggle} toggled={toggled} />
            </div>
          </div>
        </div>
        <div
          className="navbar m-active black-nav"
        >
          <div className="navbar-content">
            <div
              id="ham"
              onClick={() => {
                toggle();
              }}
            >
              <span id="line1" className="menu-lines"></span>
              <span id="line2" className="menu-lines"></span>
            </div>
            <span
              className="logo-anchor"
              onClick={() => {
                if (!toggled) {
                  setNavigation("/");
                  props.history.push("/");
                  scrollTop();
                }
              }}
            >
              <img className="logo" src={logo} alt="Crayobois logo" />
            </span>
            <User toggle={toggle} toggled={toggled} />
          </div>
        </div>
      </nav>
      <div id="mobile-tabs">
        <ul className="mobile-nav-links">
          {navLinks.map(link => {
            return (
              <li key={link.id}>
                <span
                  className="mobile-nav-link"
                  onClick={() => {
                    toggle();
                    props.history.push(link.path);
                    scrollTop();
                  }}
                  key={link.id}
                >
                  {link.text}
                </span>
              </li>
            );
          })}
          <li>
            <span
              className="mobile-nav-link"
              onClick={() => {
                toggle();
                setUserNav("profile");
                setNavigation("/utilisateur");
                props.history.push("/utilisateur");
                scrollTop();
              }}
            >
              {auth ? "mon compte" : "connexion"}
              {auth ? (
                <i className="fas fa-user nav-user-icons"></i>
              ) : (
                <i className="fas fa-sign-in-alt  nav-user-icons"></i>
              )}
            </span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Nav);
