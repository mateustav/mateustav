/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/pro-duotone-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { OutboundLink } from "gatsby-plugin-google-analytics"

import { Container, Row, Col } from "react-bootstrap"
import Navbar from "./navBar"

const Layout = ({ children, pageInfo }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Navbar pageInfo={pageInfo} />
        <Container>
          <Row>
            <Col>
              <main>{children}</main>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center my-5">
            <Col>
              <footer className="text-center">
                <p>© {new Date().getFullYear()} – Built with <FontAwesomeIcon icon={faHeart} /> by yours truly</p>
                <span className="p-2"><OutboundLink href="https://github.com/mateustav"><FontAwesomeIcon icon={faGithub} className="fa-lg" /></OutboundLink></span>
                <span className="p-2"><OutboundLink href="https://twitter.com/mattavares"><FontAwesomeIcon icon={faTwitter} className="fa-lg" /></OutboundLink></span>
              </footer>
            </Col>
          </Row>
        </Container>
      </>
    )}
  />
)

export default Layout
