import React from "react";
import { Navbar, Container, Column, Dropdown, Button } from "rbx";
import logoImage from "../../assets/images/logo-white.png";
import "../../styles/header.scss";
import { Link, useNavigate } from "react-router-dom";
import UsersService from "../../services/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { NavbarBurger } from "rbx/components/navbar/navbar-burger";

const HeaderLogged = ({ setSidebar, sidebar }) => {
  const navigate = useNavigate();

  const logOut = () => {
    UsersService.logout();
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar className="navbar-logged is-purple">
      <Navbar.Brand>
        <Column.Group>
          <Column size="11" offset="1">
            <Link to="/notes">
              <img src={logoImage} />
            </Link>
          </Column>
        </Column.Group>
        <Navbar.Item as="div">
          <Button
            className="button is-small"
            color="white"
            outlined
            onClick={() => setSidebar(!sidebar)}
          >
            <FontAwesomeIcon icon={faList} />
          </Button>
        </Navbar.Item>
        <NavbarBurger />
      </Navbar.Brand>

      <Navbar.Menu>
        <Navbar.Segment
          as="div"
          className="navbar-item navbar-end"
          align="right"
        >
          <Navbar.Item dropdown hoverable>
            <Navbar.Link>
              <Button className="button" color="white">
                {user.name}
              </Button>
            </Navbar.Link>
            <Navbar.Dropdown boxed>
              <Navbar.Item as="div">
                <Link to="/users/edit">User Edit</Link>
              </Navbar.Item>
              <Navbar.Item as="div">
                <Link to="/notes">Notes</Link>
              </Navbar.Item>
              <Dropdown.Divider />
              <Navbar.Item as="div">
                <Button
                  className="button is-danger is-small"
                  onClick={logOut}
                  outlined
                >
                  LogOut
                </Button>
              </Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar>
  );
};

export default HeaderLogged;
