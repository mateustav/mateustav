import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Header = () => (
  <StaticQuery
    query={graphql`query getHeaderImage {
      mat: file(relativePath: { eq: "16-bit-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 317) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    `}
    render={data => (
      <Container className="py-sm-5">
        <Row className="align-items-center justify-content-center">
          <Col sm={11} md={12}>
            <div className="header-card">
              <Row className="align-items-start align-items-md-center pt-5 pt-sm-4 pt-lg-0 px-3 px-sm-5 position-relative h-100 justify-content-center justify-content-sm-between">
                <Col sm={8} className="mb-4 mb-sm-0">
                  <div>
                    <h1 className="font-weight-lighter">Hi, I'm <span className="font-weight-bold">Mat</span>!</h1>
                    <p className="mb-0 font-weight-bold">I'm a Full-Stack Developer based in Vancouver. <span role="img">🇨🇦</span></p>
                  </div>
                </Col>
                <Col sm={4} className="align-self-end">
                  <Img fluid={data.mat.childImageSharp.fluid} alt="mat" className="about-me-headphoto" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    )}
  />
)

export default Header