import React from "react"
import { Link } from "gatsby"
import { Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPencil } from '@fortawesome/pro-duotone-svg-icons'
import { faChevronCircleRight } from '@fortawesome/pro-regular-svg-icons'

const PostLink = ({ post }) => {
  // console.log(post);
  const { 
    date,
    featuredImage,
    path,
    tag,
    title,
    updated_at
  } = post.frontmatter;
  const excerpt = post.excerpt;
  const postImage = featuredImage.childImageSharp.fluid;
  return (
  <Row className="mb-5 blog-listing">
    <Col>
      <Link to={path} className="text-decoration-none">
        <Row className="align-items-center">
          <Col sm="2">
            <Img fluid={postImage} className="mx-5 mx-sm-0" />
          </Col>
          <Col className="pt-3 pt-sm-0 px-sm-0 col d-flex align-self-stretch flex-wrap flex-column justify-content-between">
            <h1 className="mb-0">{title}</h1>
            <p className="mb-0"><small><FontAwesomeIcon icon={faCalendar} /> Written on {date}
              {tag && (<> | <strong>{tag.charAt(0).toUpperCase() + tag.slice(1)}</strong></>)}
              {date !== updated_at && (<> | <FontAwesomeIcon icon={faPencil} /> Updated on {updated_at}</>)}
              </small>
            </p>
          </Col>
        </Row>
      </Link>
      <Row className="mt-4">
        <Col sm="12">
          <p className="font-weight-light mb-0 excerpt">{excerpt}</p>
          <Link to={path} className="text-decoration-none float-sm-right position-relative p-3 read-more">
            <p className="m-0 m-sm-n3">Read <FontAwesomeIcon icon={faChevronCircleRight} className="mx-1" /></p>
          </Link>
        </Col>
      </Row>
    </Col>
  </Row>
)}

export default PostLink
