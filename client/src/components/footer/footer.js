import React from "react";
import "./footer.css";

const Footer = props => {
  return (
    <React.Fragment>
      <section className="footer-section">
        <div className="madeby">
          <span className="footer-madeby">
            Fait avec <span className="red">❤</span> par Zachary Legros
          </span>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/zachary-legros/" className="madeby-link" target="_blank">
            <i className="fab fa-linkedin-in madeby-icon"></i>
          </a>
          <a href="https://www.instagram.com/zachlegrosphotos/" className="madeby-link" target="_blank">
            <i className="fab fa-instagram madeby-icon"></i>
          </a>
        </div>
        <span className="footer-copyright">
          © {new Date().getFullYear()} Crayobois
        </span>
      </section>
    </React.Fragment>
  );
};

export default Footer;
