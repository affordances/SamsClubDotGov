import React from "react";
import "./App.css";
import Ticket from "./Ticket.js";
import MyInfo from "./MyInfo.js";

import FontAwesome from "react-fontawesome";
import html2pdf from "html2pdf.js";

import { Redirect, Link } from "react-router-dom";

class Profile extends React.Component {
  makePDF = () => {
    let el = document.getElementById("ticket-container");

    html2pdf(el, {
      filename: "ticket.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", orientation: "landscape", format: [8.5, 11] },
    });
  };

  render() {
    if (this.props.loggedIn) {
      const formatAddress = ({ number, street, streetType, cityAndState }) => {
        return (
          <div className="profile-ticket-address">
            <div style={{ textAlign: "right" }}>
              {number + " " + street + " " + streetType}
            </div>
            <div style={{ textAlign: "right" }}>{cityAndState}</div>
          </div>
        );
      };

      const sortedAppointments = !this.props.appointments
        ? []
        : this.props.appointments.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
          });

      const formattedAppointments = sortedAppointments.map(
        (appointment, index) => (
          <div key={index} className="profile-ticket-container">
            <div className="profile-ticket-details-container">
              <div className="profile-ticket-name-and-address-container">
                <div className="profile-ticket-name">
                  {appointment.product.name}
                </div>
                {formatAddress(appointment.address)}
              </div>
              <div className="profile-ticket-date-and-time-container">
                <div className="profile-ticket-date">
                  {new Date(appointment.date).toLocaleDateString()}
                </div>
                <div className="profile-ticket-time">{appointment.time}</div>
              </div>
            </div>
            <div className="profile-ticket-button-container">
              <div className="profile-ticket-button">
                <FontAwesome
                  name="arrow-down"
                  size="2x"
                  className="profile-ticket-icon"
                  onClick={this.makePDF}
                ></FontAwesome>
              </div>
              <div className="profile-ticket-button">
                <FontAwesome
                  name="ban"
                  size="2x"
                  className="profile-ticket-icon"
                  onClick={this.props.cancelAppointment(index)}
                ></FontAwesome>
              </div>
            </div>
            <Ticket
              style={{ display: "none", visibility: "hidden" }}
              user={this.props.user}
              ticket={appointment}
              discount={this.props.discount}
            />
          </div>
        )
      );

      return (
        <div className="profile-container">
          <div className="tab-headers-container">
            {this.props.profileTab === "myInfo" ? (
              <div
                className="tab-header"
                onClick={this.props.changeTab("myInfo")}
              >
                My Info
              </div>
            ) : (
              <div
                className="tab-header selected"
                onClick={this.props.changeTab("myInfo")}
              >
                My Info
              </div>
            )}
            {this.props.profileTab === "appointments" ? (
              <div
                className="tab-header"
                onClick={this.props.changeTab("appointments")}
              >
                Appointments
              </div>
            ) : (
              <div
                className="tab-header selected"
                onClick={this.props.changeTab("appointments")}
              >
                Appointments
              </div>
            )}
          </div>
          <div className="tab-body-container">
            {this.props.profileTab === "myInfo" ? (
              <div className="tab-body">
                <MyInfo user={this.props.user} />
              </div>
            ) : null}
            {this.props.profileTab === "appointments" ? (
              formattedAppointments.length > 0 ? (
                <div className="tab-body">
                  <div className="profile-ticket-container-container">
                    <div className="profile-ticket-header-container">
                      <div className="profile-ticket-header">
                        <div className="profile-ticket-details-container">
                          <div className="profile-ticket-name-and-address-container">
                            <div>Procedure</div>
                            <div>Location</div>
                          </div>
                          <div className="profile-ticket-date-and-time-container">
                            <div>Date</div>
                            <div>Time</div>
                          </div>
                        </div>
                        <div className="profile-ticket-button-container">
                          <div>Download</div>
                          <div>Cancel</div>
                        </div>
                      </div>
                      <hr />
                    </div>
                    {formattedAppointments}
                  </div>
                </div>
              ) : (
                <div
                  className="page-error-container"
                  style={{ border: "none", marginBottom: "0px" }}
                >
                  <div className="page-error">No appointments</div>
                  <div className="continue-shopping">
                    <Link to="/">Continue shopping</Link>
                  </div>
                </div>
              )
            ) : null}
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Profile;
