import * as qs from "query-string"
import React, { useRef, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import axios from "axios"

const ContactForm = () => {
  const form = useRef(null);
  const formName = useRef('form-name');
  const name = useRef('name');
  const email = useRef('email');
  const message = useRef('message');
  const [value, setValue] = useState({
    submitFeedback: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const formInputs = new FormData(form.current);
    for (const entry of formInputs.entries()) {
      formData[entry[0]] = entry[1];
    }

      const axiosOptions = {
        url: '/',
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(formData),
      };

      axios(axiosOptions)
      .then(response => {
        setValue({
          submitFeedback: "Form submitted successfully!",
        })
        form.current.reset();
      })
      .catch(err =>
        setValue({
          submitFeedback: "Form could not be submitted.",
        })
      )
  };

  return (
    <Form name="Contact Form" className="contact-form" method="POST" data-netlify="true" ref={form} onSubmit={e => handleSubmit(e)}>
      <Row className="px-3 px-sm-0">
        <Col md={7}>
          <Form.Control type="hidden" value="Contact Form"></Form.Control>
          <Form.Group controlId="name" className="pt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Johnny Cash" required />
          </Form.Group>
          <Form.Group controlId="email" className="py-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="johnny@maninblack.com" required />
          </Form.Group>
          <Form.Group controlId="message" className="pb-3">
            <Form.Label>Your Message</Form.Label>
            <Form.Control name="message" as="textarea" rows="5" placeholder="Hello, I'm Johnny Cash..." /*placeholder="I keep a close watch on this heart of mine&#10;I keep my eyes wide open all the time..."*/ required />
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