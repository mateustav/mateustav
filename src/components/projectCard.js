import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const ProjectCard = (props) => {
  const { description, github, image, key, link, title } = props;
  const { fluid } = image.childImageSharp;
  const GithubLink = () => {
    if (github) {
      return (
        <OutboundLink href={github} className="card-link ml-lg-5 ml-0 mt-lg-0 mt-4 py-3 px-2" rel="noreferrer nofollow noopener">
          <FontAwesomeIcon icon={faGithub} className="fa-lg" /> GitHub
        </OutboundLink>
      );
    }
    return false;
  };
  return (
    <Card className="shadow border-0 h-100 rounded-0">
      <Row className="h-100">
        <Col>
          <Img fluid={fluid} alt={title} className="h-100" />
        </Col>
        <Col lg={7}>
          <Card.Body className="d-flex h-100 flex-column justify-content-between font-weight-lighter">    
            <Card.Title className="">{title}</Card.Title>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
            <div className="d-flex flex-column flex-lg-row">
            <OutboundLink href={link} className="order-2 order-lg-0 card-link py-3 px-2" rel="noreferrer nofollow noopener">
            <FontAwesomeIcon icon={faLink} className="fa-lg" /> View Site
            </OutboundLink>
            <GithubLink />
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default ProjectCard;
