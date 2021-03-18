import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { faCss3Alt, faBootstrap, faHtml5, faJs, faNodeJs, faWordpressSimple } from '@fortawesome/free-brands-svg-icons'

const Stack = () => {
  return (
    <Container id="stack">
      <Row id="tech-icons" className="my-5 justify-content-center">
        <Col lg={8}>
          <Row>
            <Col lg={true} xs={6} md={3} className="my-3 mb-md-5">
              <div className="position-relative" data-target="#html" data-tooltip="HTML">
                <FontAwesomeIcon icon={faHtml5} id="html" className="fa-5x fa-fw m-auto w-100" />
              </div>
            </Col>
            <Col lg={true} xs={6} md={3} className="my-3 mb-md-5">
              <div className="position-relative" data-target="#css" data-tooltip="CSS">
                <FontAwesomeIcon icon={faCss3Alt} id="css" className="fa-5x fa-fw m-auto w-100" />
              </div>
            </Col>
            <Col lg={true} xs={6} md={3} className="my-3 mb-md-5">
              <div className="d-flex h-100 w-100" data-target="#javascript" data-tooltip="Javascript">
                  <FontAwesomeIcon icon={faJs} id="javascript" className="fa-5x fa-fw m-auto w-100" style={{zIndex: 2}} />
                  <FontAwesomeIcon icon={faSquareFull} className=" fa-2x fa-stack-2x fa-fw m-auto" />
              </div>
            </Col>
            <Col lg={true} xs={6} md={3} className="my-3 mb-md-5">
              <div className="position-relative" data-target="#bootstrap" data-tooltip="Bootstrap">
                <FontAwesomeIcon icon={faBootstrap} id="bootstrap" className="fa-5x fa-fw m-auto w-100" />
              </div>
            </Col>
            <Col lg={true} xs={6} md={3} className="my-3">
              <div className="position-relative" data-target="#wordpress" data-tooltip="WordPress" style={{color: `blue`}}>
              <FontAwesomeIcon icon={faWordpressSimple} id="wordpress" className="fa-5x fa-fw m-auto w-100" />
              </div>
            </Col>
            <Col lg={true} xs={6} md={3} className="my-3">
              <div className="position-relative" data-target="#gatsby" data-tooltip="GatsbyJS">
                <svg role="img" id="gatsby" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg-inline--fa fa-w-12 fa-5x fa-fw m-auto w-100" fill="currentColor"><title>Gatsby icon</title><path d="M12.001.007C5.326.007.007 5.326.007 12S5.326 23.995 12 23.995s11.994-5.319 11.994-11.994S18.676.007 12.001.007zM2.614 12.105l9.283 9.283c-5.111 0-9.283-4.172-9.283-9.283zm11.473 9.074L2.823 9.915C3.76 5.743 7.516 2.614 12 2.614a9.476 9.476 0 0 1 7.614 3.86L18.259 7.62a7.657 7.657 0 0 0-6.362-3.337A7.555 7.555 0 0 0 4.7 9.393l9.804 9.805c2.4-.835 4.276-2.92 4.798-5.424h-4.068v-1.773h6.154c0 4.485-3.129 8.24-7.301 9.178z"/></svg>
              </div>
            </Col>
            <Col lg={true} xs={6} md={3} className="my-3">
              <div className="position-relative" data-target="#nodejs" data-tooltip="NodeJS">
              <FontAwesomeIcon icon={faNodeJs} id="nodejs" className="fa-5x fa-fw m-auto w-100" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Stack
