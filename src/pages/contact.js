import React from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/pro-duotone-svg-icons'

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => (
  <Layout pageInfo={{ pageName: "contact-me" }}>
    <SEO title="Contact Me" />
    <Container className="contact">
      <Row>
        <Col>
          <h1 className="px-3 px-sm-0">Reach out!</h1>
          <Form name="Contact Form  " className="contact-form" method="POST" data-netlify="true">
            <Row className="px-3 px-sm-0">
              <Col md={7}>
                <Form.Group controlId="name" className="pt-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Johnny Cash" />
                </Form.Group>
                <Form.Group controlId="email" className="py-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="johnny@maninblack.com" />
                </Form.Group>
                <Form.Group controlId="message" className="pb-3">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control as="textarea" rows="5" placeholder="Hello, I'm Johnny Cash..." /*placeholder="I keep a close watch on this heart of mine&#10;I keep my eyes wide open all the time..."*/ />
                </Form.Group>
                <Button variant="dark" type="submit" className="rounded-0 px-sm-4">
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2"/> Send
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      </Container>
  </Layout>
)

export default ContactPage
