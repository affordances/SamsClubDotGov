import React from "react";
import "./App.css";
import UserDropdown from "./UserDropdown.js";
import Search from "./Search.js";

import FontAwesome from "react-fontawesome";
import NotificationBadge from "react-notification-badge";

import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <div className="header">
          <div className="logo-and-searchbar-container">
            <div className="logo">
              <Link to="/">{"Uncle Sam's Club"}</Link>
            </div>
            <Search products={this.props.products} />
          </div>

          {this.props.loggedIn ? (
            <div className="calendar-and-user-icon-container">
              <Link
                to="/profile"
                onClick={this.props.changeTab("appointments")}
                style={{
                  display: "inline-block",
                  height: "45px",
                  width: "44px",
                }}
              >
                <FontAwesome
                  name="calendar"
                  style={{ float: "left" }}
                  size="2x"
                ></FontAwesome>
                <NotificationBadge
                  count={
                    this.props.appointments
                      ? this.props.appointments.length
                      : null
                  }
                  effect={[null, null, {}, {}]}
                />
              </Link>
              <UserDropdown
                onLogout={this.props.onLogout}
                changeTab={this.props.changeTab}
              />
            </div>
          ) : (
            <div className="sign-in-link">
              <Link to="/login">Sign in</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
