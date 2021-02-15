import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Header = () => (
  <StaticQuery
    query={graphql`query getHeaderImage {
      mat: file(relativePath: { eq: "mateus.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 317) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    `}
    render={data => (
      <Container className="about-me py-sm-5">
        <Row className="border align-items-center py-3 p-sm-5 position-relative h-100 justify-content-center justify-content-sm-between about-spotlight">
          <Col md={6} className="mb-4 mb-sm-0">
            <div>
              <h1>Hi, I'm Mat!</h1>
              <p className="mb-0">Full-time marketer &amp;<br/>web development enthusiast</p>
            </div>
          </Col>
          <Col md={6}>
            <Img fluid={data.mat.childImageSharp.fluid} alt="test" className="about-me-headphoto" />
          </Col>
        </Row>
      </Container>
    )}
  />
)

export default Header