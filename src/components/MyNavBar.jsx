import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductsSidebar from "./ProductsSidebar";
import "../styles/home.css";
const MyNavBar = ({ validation, isValidation }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("token", "");
    isValidation(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            E-COMERCE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav "
            className="justify-content-end navBar"
          >
            <Nav>
              <Nav.Link as={Link} to="/">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/purchases">
                purchases
              </Nav.Link>
              <Nav.Link onClick={validation && logout} as={Link} to="/login">
                {validation ? "Logout" : "Login"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavBar;
