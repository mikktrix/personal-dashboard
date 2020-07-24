import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Container,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import LogOut from "./auth/LogOut";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AppNavbar = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const { isAuthenticated, user } = auth;

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </span>
      </NavItem>
      <NavItem>
        <LogOut />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Fragment>
                <NavItem>
                  <Link to="/">
                    <NavLink>Todo List</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/invest">
                    <NavLink>Calculator</NavLink>
                  </Link>
                </NavItem>
              </Fragment>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
