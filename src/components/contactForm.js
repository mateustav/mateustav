import React, { useRef } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSpinner } from '@fortawesome/pro-duotone-svg-icons'

const ContactForm = () => {
  const form = useRef(null);

  return (
    <Form name="Contact Form" className="contact-form" method="POST" data-netlify="true" ref={form}>
      <Row className="px-3 px-sm-0">
        <Col md={7}>
          <Form.Group controlId="name" className="pt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Johnny Cash" required />
          </Form.Group>
          <Form.Group controlId="email" className="py-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="johnny@maninblack.com" required />
          </Form.Group>
          <Form.Group controlId="message" className="pb-3">
            <Form.Label>Your Message</Form.Label>
            <Form.Control as="textarea" rows="5" placeholder="Hello, I'm Johnny Cash..." /*placeholder="I keep a close watch on this heart of mine&#10;I keep my eyes wide open all the time..."*/ required />
          </Form.Group>
          <Button variant="dark" type="submit" className="rounded-0 px-sm-4">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2"/> Send
          </Button>
          <div className="submission-status mt-3"><FontAwesomeIcon icon={faSpinner} spin /> <span className="pl-2">Sending...</span>
          </div>
        </Col>
      </Row>
    </Form>
)}

export default ContactForm