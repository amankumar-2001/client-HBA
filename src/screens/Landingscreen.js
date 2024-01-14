import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  border-right: 8px solid white;
  min-width: 1000px;
`;

const LandingContent = styled.div`
  text-align: center;
`;

const ResponsiveHeading = styled.h2`
  color: white;
  font-size: 130px;
`;

const SubHeading = styled.h1`
  color: white;
`;

const LandingButton = styled.button`
  color: black;
  background-color: white;
`;

function Landingscreen() {
  return (
    <LandingContainer className="row landing justify-content-center">
      <LandingContent className="col-md-9 my-auto text-center">
        <ResponsiveHeading data-aos="zoom-in">Hotel-Booking.com</ResponsiveHeading>
        <SubHeading data-aos="zoom-out">"Atithi Devo Bhava"</SubHeading>
        <Link to="/home">
          <LandingButton className="btn landingbtn">Get Started</LandingButton>
        </Link>
      </LandingContent>
    </LandingContainer>
  );
}

export default Landingscreen;
