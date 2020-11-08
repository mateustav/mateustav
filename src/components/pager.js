import React from "react";
import { Link } from "gatsby";
import { Row, Col } from "react-bootstrap"

export default function Pager({ pageContext }) {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/" : `/posts/${(currentPage - 1)}/`;
  const nextPage = `/posts/${(currentPage + 1)}/`;
  
  return (
    <Row>
      <Col className="d-flex justify-content-around">
        {!isFirst && (
          <Link to={prevPage} className="btn btn-outline-secondary rounded-0" rel="prev">
            ← Previous Page
          </Link>
        )}
        {!isLast && (
          <Link to={nextPage} className="btn btn-outline-secondary rounded-0" rel="next">
            Next Page →
          </Link>
        )}
      </Col>
  </Row>
  )
}
