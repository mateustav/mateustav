import React from "react"
import { Link } from "gatsby"

import { Container, Navbar, Nav } from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  return (
    <>
      <Navbar expand="sm" id="primary-navbar" className="py-4 mb-5">
        <Container className="container-sm">
          <Link to="/" className="link-no-style">
            <Navbar.Brand as="span" className="py-2 mr-0">Mat Tavares</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="justify-content-sm-end w-100" activeKey={pageInfo && pageInfo.pageName}>
              <Link to="/" className="link-no-style" activeClassName="active">
                <Nav.Link as="span" eventKey="home" className="px-sm-3">
                  Home
                </Nav.Link>
              </Link>
              <Link to="/posts/" className="link-no-style" activeClassName="active">
                <Nav.Link as="span" eventKey="about-me" className="px-sm-3">
                  Posts
                </Nav.Link>
              </Link>
              <Link to="/projects/" className="link-no-style" activeClassName="active">
                <Nav.Link as="span" eventKey="about-me" className="px-sm-3">
                  Projects
                </Nav.Link>
              </Link>
              <Link to="/about-me/" className="link-no-style" activeClassName="active">
                <Nav.Link as="span" eventKey="about-me" className="px-sm-3">
                  About
                </Nav.Link>
              </Link>
              <Link to="/contact/" className="btn btn-dark d-flex d-sm-inline-block align-self-start ml-sm-2 rounded-0" activeClassName="active">
                <Nav.Link as="span" eventKey="contact" className="py-0 px-sm-3 text-white">
                  Contact
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default CustomNavbar
