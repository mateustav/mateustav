import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPencil } from '@fortawesome/pro-duotone-svg-icons'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const {
    date,
    featuredImage,
    // path,
    tag,
    // title,
    updated_at
  } = frontmatter;
  const featuredImgFluid = featuredImage.childImageSharp.fluid

  return (
    
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title={frontmatter.title} />
      <Container className="blog-post">
        <Row>
          <Col>
            <Img fluid={featuredImgFluid} alt="test" />
            <h1 className="mt-5 mb-3">{frontmatter.title}</h1>
            <p className="mb-5"><small><FontAwesomeIcon icon={faCalendar} /> Written on {date}
              {tag && (<> | <strong>{tag.charAt(0).toUpperCase() + tag.slice(1)}</strong></>)}
              {date !== updated_at && (<> | <FontAwesomeIcon icon={faPencil} /> Updated on {updated_at}</>)}
              </small>
            </p>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        # path
        tag
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`