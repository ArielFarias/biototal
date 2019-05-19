/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="https://www.biologiatotal.com.br/">Biologia Total</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.biologiatotal.com.br/">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.biologiatotal.com.br/">Blog</NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} Designed by{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a
              href="javascript:void(0)"
              rel="noopener noreferrer"
              target="_blank"
            >
              Creative Tim
            </a>{" "}
            Coded by{" "}
            <a
              href="javascript:void(0)"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ariel Farias
            </a>{" "}
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
