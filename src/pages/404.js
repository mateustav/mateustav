import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({
  data
}) => {
  const { image_url } = data.giphyGif;
  return(
  <Layout pageInfo={{ pageName: "contact-me" }}>
  <SEO title="404: Not found" />
  <Container className="contact">
    <Row className="justify-content-center">
      <Col>
        <h1 className="px-3 px-sm-0 font-weight-bold">Page not found.</h1>
        <p>This is not what you were looking for, but here's a random gif:</p>
        <img src={image_url} alt="random gif" />
      </Col>
    </Row>
    </Container>
  </Layout>
)}

export default NotFoundPage

export const randomGiphy = graphql`query getRandomGif {
  giphyGif {
    id
    image_url
  }
}
`;