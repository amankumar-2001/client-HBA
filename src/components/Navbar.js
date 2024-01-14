import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: black;
`;

const StyledBrand = styled.div`
  color: white;
  font-weight: 700;
  font-size: 2.5vh;

  &:hover{
    color: grey;
    cursor: pointer;
  }
`;

const StyledLink = styled.a`
  color: white;
  &:hover {
    color: gray;
  }
`;

const UserDropdown = styled(Dropdown)`
  margin-left: auto;
`;

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }
  return (
    <StyledNav className="navbar navbar-expand-lg">
      <div className="container-fluid reqNav">
        <StyledBrand className="navbar-brand" href="/">
          Hotel-Booking.com
        </StyledBrand>
        <div className="collapse navbar-collapse" id="navbarNav">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {user ? (
            <UserDropdown>
              <Dropdown>
                <img
                  src="https://www.pngkit.com/png/full/88-885453_login-white-on-clear-user-icon.png"
                  alt=""
                ></img>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {user.data.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  {user.data.isAdmin && (
                    <Dropdown.Item href="/admin">Admin Panel</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </UserDropdown>
          ) : (
            <UserDropdown>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <StyledLink
                    className="nav-link"
                    aria-current="page"
                    href="/login"
                  >
                    Login
                  </StyledLink>
                </li>
                <li className="nav-item">
                  <StyledLink className="nav-link" href="/register">
                    Register
                  </StyledLink>
                </li>
              </ul>
            </UserDropdown>
          )}
        </div>
      </div>
    </StyledNav>
  );
}

export default Navbar;
