import React from "react"
import { Card } from "react-bootstrap"
import Img from "gatsby-image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const ProjectCard = (props) => {
  const { description, github, image, key, link, title } = props;
  const { fluid } = image.childImageSharp;
  const GithubLink = () => {
    if (github) {
      return (
        <Card.Link href={github} className="stretched-link-off card-link" rel="noreferrer nofollow noopener"><FontAwesomeIcon icon={faGithub} className="fa-lg" /></Card.Link>
      );
    }
    return false;
  };
  return (
    <Card className="shadow border-0 h-100 rounded-0">
      <Card.Header className="p-0 position-relative">
        <Img fluid={fluid} alt={title} />
        <Card.Title className="position-absolute text-white">{title}</Card.Title>
      </Card.Header>
      <Card.Body className="d-flex h-100 flex-column justify-content-between font-weight-lighter">    
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </Card.Body>
      <Card.Footer className="bg-white d-flex justify-content-end">
        <GithubLink />
        <Card.Link href={link} className="stretched-link-off card-link" rel="noreferrer nofollow noopener"><FontAwesomeIcon icon={faLink} className="fa-lg" /></Card.Link>
      </Card.Footer>
    </Card>
  )
}

export default ProjectCard;
