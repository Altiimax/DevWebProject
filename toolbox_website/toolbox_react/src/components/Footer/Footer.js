import React, { Component } from "react";
import "./Footer.css";
import Logo from "../../assets/toolBox_logo.png";

class Footer extends Component {
  render() {
    return (
      <div className="mainFooter">
        <div className="container">
          <div className="row">
            <div className="col">
              <img
                className="logo"
                src={Logo}
                alt="Here lays the logo"
                data-logo-alt={Logo}
              />
              <h4>
                <a className="businessName" href="/">
                  ToolBox
                </a>
              </h4>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <h5 className="footDivTitle">About us</h5>
                  <section className="footText">
                    We're students at EPHEC and we've made this web application
                    for our course of web development.
                  </section>
                </li>
                <li>
                  <h5 className="footDivTitle">Contact</h5>
                  <section className="footText">
                    HE201649@students.ephec.be
                  </section>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5 className="footDivTitle">Informations</h5>
              <ul className="list-unstyled">
                <li>
                  <a className="links" href="/about-us">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="links" href="/Contact">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="links" href="/terms">
                    {" "}
                    Terms of Service{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5 className="footDivTitle">Helpfull Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    className="links"
                    href="https://trello.com/b/Y4rZYhcT/projet-dev-web"
                  >
                    Trello
                  </a>
                </li>
                <li>
                  <a
                    className="links"
                    href="https://github.com/Altiimax/DevWebProject"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a className="links" href="/help">
                    Helpdesk
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row" id="copyrights">
            <p className="col-sm">
              &copy;{new Date().getFullYear()} ToolBox | All right reserved
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
