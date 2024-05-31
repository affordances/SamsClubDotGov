import React from "react";
import "./App.css";

import FontAwesome from "react-fontawesome";

import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <div className="company-masthead-container">
          <div className="company-name-and-icon-container">
            <div
              className="hat-icon"
              style={{
                mask: "url(/hat.svg) no-repeat center",
                WebkitMask: "url(/hat.svg) no-repeat center",
              }}
            ></div>
            <div>{"Uncle Sam's Club"}</div>
          </div>
          <div className="footer-item-with-icon-container">
            <FontAwesome
              name="phone"
              style={{ width: "30px", marginRight: "8px", textAlign: "center" }}
            ></FontAwesome>
            1-800-CALL-SAM
          </div>
          <div className="footer-item-with-icon-container">
            <FontAwesome
              name="envelope"
              style={{ width: "30px", marginRight: "8px", textAlign: "center" }}
            ></FontAwesome>
            help@samsclub.gov
          </div>
          <div className="footer-item-with-icon-container">
            <FontAwesome
              name="hourglass"
              style={{ width: "30px", marginRight: "8px", textAlign: "center" }}
            ></FontAwesome>
            Open 7-7 Mon-Fri
          </div>
        </div>
        <div className="footer-menu">
          <div className="footer-menu-header">Company</div>
          <div className="footer-menu-item">
            <Link to="/about" style={{ color: "#bebfbf" }}>
              About
            </Link>
          </div>
          <div className="footer-menu-item">Careers</div>
          <div className="footer-menu-item">Contact us</div>
          <div className="footer-menu-item">Press</div>
        </div>
        <div className="footer-menu">
          <div className="footer-menu-header">Social</div>
          <div className="footer-menu-item">Facebook</div>
          <div className="footer-menu-item">Twitter</div>
          <div className="footer-menu-item">Instagram</div>
        </div>
        <div className="footer-menu">
          <div className="footer-menu-header">Legal</div>
          <div className="footer-menu-item">Terms of Use</div>
          <div className="footer-menu-item">Privacy Policy</div>
          <div className="footer-menu-item">HIPAA</div>
          <div className="footer-menu-item">Nondiscrimination</div>
        </div>
      </div>
    );
  }
}

export default Footer;
