import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/contactForm"

const ContactPage = () => (
  <Layout pageInfo={{ pageName: "contact-me" }}>
    <SEO title="Contact Me" />
    <Container className="contact">
      <Row>
        <Col>
          <h1 className="px-3 px-sm-0">Reach out!</h1>
          <ContactForm />
        </Col>
      </Row>
      </Container>
  </Layout>
)

export default ContactPage
