import React from "react";
import { Navbar, Container, Column } from "rbx";
import logoImage from "../../assets/images/logo.png";
import "../../styles/header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar color="custom-purple">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoImage} />
          </Link>
          <Navbar.Burger
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Navbar.Burger>
        </Navbar.Brand>
        <Navbar.Menu id="navbar-menu">
          <Navbar.Segment
            as="div"
            className="navbar-item navbar-end"
            align="right"
          >
            <Column.Group>
              <Column>
                <Link
                  to="/register"
                  className="button is-danger has-text-white"
                >
                  Register
                </Link>
              </Column>
              <Column>
                <Link to="/login" className="button is-danger is-outlined">
                  Login
                </Link>
              </Column>
            </Column.Group>
          </Navbar.Segment>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
};

export default Header;
