import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { faCss3Alt, faBootstrap, faHtml5, faJs, faNodeJs, faSass, faWordpressSimple } from '@fortawesome/free-brands-svg-icons'

const Stack = () => {
  return (
    <Container id="stack">
      <Row id="tech-icons" className="my-5 justify-content-center">
        <Col lg={true} xs={6} md={true} className="my-3 mb-md-5">
          <div className="position-relative" data-target="#html" data-tooltip="HTML">
            <FontAwesomeIcon style="max-width: 112px" icon={faHtml5} id="html" className="fa-5x fa-fw m-auto w-100" />
          </div>
        </Col>
        <Col lg={true} xs={6} md={true} className="my-3 mb-md-5">
          <div className="position-relative" data-target="#css" data-tooltip="CSS">
            <FontAwesomeIcon style="max-width: 112px" icon={faCss3Alt} id="css" className="fa-5x fa-fw m-auto w-100" />
          </div>
        </Col>
        <Col lg={true} xs={6} md={true} className="my-3 mb-md-5">
          <div className="position-relative" data-target="#sass" data-tooltip="Sass">
            <FontAwesomeIcon style="max-width: 112px" icon={faSass} id="sass" className="fa-5x fa-fw m-auto w-100" />
          </div>
        </Col>
        <Col lg={true} xs={6} md={true} className="my-3 mb-md-5">
          <div className="d-flex h-100 w-100" data-target="#javascript" data-tooltip="Javascript">
              <FontAwesomeIcon style="max-width: 112px" icon={faJs} id="javascript" className="fa-5x fa-fw m-auto w-100" style={{zIndex: 2}} />
              <FontAwesomeIcon style="max-width: 112px" icon={faSquareFull} className=" fa-2x fa-stack-2x fa-fw m-auto" />
          </div>
        </Col>
        <Col lg={true} xs={6} md={true} className="my-3 mb-md-5">
          <div className="position-relative" data-target="#bootstrap" data-tooltip="Bootstrap">
            <FontAwesomeIcon style="max-width: 112px" icon={faBootstrap} id="bootstrap" className="fa-5x fa-fw m-auto w-100" />
          </div>
        </Col>
        <Col lg={true} xs={6} md={true} className="my-3">
          <div className="position-relative" data-target="#wordpress" data-tooltip="WordPress" style={{color: `blue`}}>
          <FontAwesomeIcon style="max-width: 112px" icon={faWordpressSimple} id="wordpress" className="fa-5x fa-fw m-auto w-100" />
          </div>
        </Col>
        <Col lg={true} xs={6} md={true} className="my-3">
          <div className="position-relative" data-target="#gatsby" data-tooltip="GatsbyJS">
            <svg role="img" id="gatsby" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg-inline--fa fa-w-12 fa-5x fa-fw m-auto w-100" fill="currentColor"><title>Gatsby icon</title><path d="M12.001.007C5.326.007.007 5.326.007 12S5.326 23.995 12 23.995s11.994-5.319 11.994-11.994S18.676.007 12.001.007zM2.614 12.105l9.283 9.283c-5.111 0-9.283-4.172-9.283-9.283zm11.473 9.074L2.823 9.915C3.76 5.743 7.516 2.614 12 2.614a9.476 9.476 0 0 1 7.614 3.86L18.259 7.62a7.657 7.657 0 0 0-6.362-3.337A7.555 7.555 0 0 0 4.7 9.393l9.804 9.805c2.4-.835 4.276-2.92 4.798-5.424h-4.068v-1.773h6.154c0 4.485-3.129 8.24-7.301 9.178z"/></svg>
          </div>
        </Col>
        <Col lg={true} xs={6} md={true} className="my-3">
          <div className="position-relative" data-target="#graphql" data-tooltip="GraphQL">
          	<svg version="1.1" class="m-auto d-block" id="graphql" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 400 400" fill="currentColor" enablebackground="new 0 0 400 400"><g><g><g><rect x="122" y="-0.4" transform="matrix(-0.866 -0.5 0.5 -0.866 163.3196 363.3136)" width="16.6" height="320.3"/></g></g><g><g><rect x="39.8" y="272.2" width="320.3" height="16.6"/></g></g><g><g><rect x="37.9" y="312.2" transform="matrix(-0.866 -0.5 0.5 -0.866 83.0693 663.3409)" width="185" height="16.6"/></g></g><g><g><rect x="177.1" y="71.1" transform="matrix(-0.866 -0.5 0.5 -0.866 463.3409 283.0693)" width="185" height="16.6"/></g></g><g><g><rect x="122.1" y="-13" transform="matrix(-0.5 -0.866 0.866 -0.5 126.7903 232.1221)" width="16.6" height="185"/></g></g><g><g><rect x="109.6" y="151.6" transform="matrix(-0.5 -0.866 0.866 -0.5 266.0828 473.3766)" width="320.3" height="16.6"/></g></g><g><g><rect x="52.5" y="107.5" width="16.6" height="185"/></g></g><g><g><rect x="330.9" y="107.5" width="16.6" height="185"/></g></g><g><g><rect x="262.4" y="240.1" transform="matrix(-0.5 -0.866 0.866 -0.5 126.7953 714.2875)" width="14.5" height="160.9"/></g></g><path d="M369.5,297.9c-9.6,16.7-31,22.4-47.7,12.8c-16.7-9.6-22.4-31-12.8-47.7c9.6-16.7,31-22.4,47.7-12.8
		C373.5,259.9,379.2,281.2,369.5,297.9"/><path d="M90.9,137c-9.6,16.7-31,22.4-47.7,12.8c-16.7-9.6-22.4-31-12.8-47.7c9.6-16.7,31-22.4,47.7-12.8
		C94.8,99,100.5,120.3,90.9,137"/><path d="M30.5,297.9c-9.6-16.7-3.9-38,12.8-47.7c16.7-9.6,38-3.9,47.7,12.8c9.6,16.7,3.9,38-12.8,47.7
		C61.4,320.3,40.1,314.6,30.5,297.9"/><path d="M309.1,137c-9.6-16.7-3.9-38,12.8-47.7c16.7-9.6,38-3.9,47.7,12.8c9.6,16.7,3.9,38-12.8,47.7
		C340.1,159.4,318.7,153.7,309.1,137"/><path d="M200,395.8c-19.3,0-34.9-15.6-34.9-34.9c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9
		C234.9,380.1,219.3,395.8,200,395.8"/><path d="M200,74c-19.3,0-34.9-15.6-34.9-34.9c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9
		C234.9,58.4,219.3,74,200,74"/></g></svg>
          </div>
        </Col>
        <Col lg={true} xs={6} md={true} className="my-3">
          <div className="position-relative" data-target="#nodejs" data-tooltip="NodeJS">
          <FontAwesomeIcon style="max-width: 112px" icon={faNodeJs} id="nodejs" className="fa-5x fa-fw m-auto w-100" />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Stack
