import * as qs from "query-string"
import React, { useRef, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle, faPaperPlane, faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import axios from "axios"

const ContactForm = () => {
  const form = useRef(null);
  const name = useRef('name');
  const email = useRef('email');
  const message = useRef('message');
  const [feedback, setValue] = useState({
    submitFeedback: null,
    submitIcon: faSpinner,
    submitStatus: 'invisible'
  });

  const {submitFeedback, submitIcon, submitStatus } = feedback;

  const handleSubmit = (e) => {
    e.preventDefault();

    setValue({
      submitFeedback: "Sending...",
      submitIcon: faSpinner,
      submitStatus: "pending"
    })

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
          submitFeedback: "Thanks! Your message was received.",
          submitIcon: faCheckCircle,
          submitStatus: "success"
        })
        form.current.reset();
      })
      .catch(err => {
        setValue({
          submitFeedback: "Form could not be submitted.",
          submitIcon: faExclamationCircle,
          submitStatus: "error"
        })
      })
  };

  const handleFocus = (e) => {
    setValue({
      submitStatus: 'invisible',
    })
  };

  return (
    <Form name="Contact Form" className="contact-form" method="POST" data-netlify="true" ref={form} onSubmit={e => handleSubmit(e)}>
      <Row className="px-3 px-sm-0">
        <Col md={7}>
        <input type="hidden" name="form-name" value="Contact Form" />
          <Form.Group controlId="name" className="pt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Johnny Cash" ref={name} onFocus={e => handleFocus(e)} required />
          </Form.Group>
          <Form.Group controlId="email" className="py-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="johnny@maninblack.com" ref={email} onFocus={e => handleFocus(e)} required />
          </Form.Group>
          <Form.Group controlId="message" className="pb-3">
            <Form.Label>Your Message</Form.Label>
            <Form.Control name="message" as="textarea" rows="5" placeholder="Hello, I'm Johnny Cash..." /*placeholder="I keep a close watch on this heart of mine&#10;I keep my eyes wide open all the time..."*/ ref={message} onFocus={e => handleFocus(e)} required />
          </Form.Group>
          <Button variant="dark" type="submit" className="rounded-0 px-sm-4" onFocus={e => handleFocus(e)}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2"/> Send
          </Button>
          <div className={`submission-status mt-3 ${submitStatus}`}><FontAwesomeIcon icon={submitIcon} /> <span className="pl-2">{submitFeedback}</span>
          </div>
        </Col>
      </Row>
    </Form>
)}

export default ContactForm