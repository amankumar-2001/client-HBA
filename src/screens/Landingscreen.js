import React from "react";
import { Link } from "react-router-dom";

function Landingscreen() {
  return (
    <div className="row landing justify-content-center">
      <div
        className="col-md-9 my-auto text-center"
        style={{ borderRight: "8px solid white" }}
      >
        <h2
          className="responsive-heading"
          data-aos="zoom-in"
          style={{ color: "white", fontSize: "130px" }}
        >
          Hotel-Booking.com
        </h2>
        <h1 data-aos="zoom-out" style={{ color: "white" }}>
          "Atithi Devo Bhava"
        </h1>

        <Link to="/home">
          <button
            className="btn landingbtn"
            style={{ color: "black", backgroundColor: "white" }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
