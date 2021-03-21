import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { graphql } from "gatsby"
import ProjectCard from "../components/projectCard"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Projects = ({
  data
}) => {
  const projectNodes = data.allMarkdownRemark.edges;
  return (
  <Layout pageInfo={{ pageName: "Projects" }}>
  <SEO title="Projects" />

  <Container className="projects-list">
    <Row className="justify-content-center">
      <Col xs={12} className="mb-4">
        <h1 className="font-weight-bold">Jobs and Projects</h1>
      </Col>
      {projectNodes.map(({node}) => {
        const { html, id }  = node;
        const { featuredImage, github, link, tech, title } = node.frontmatter;
        return (
          <Col sm={6} lg={4} className="my-4">
            <ProjectCard description={html} key={id} image={featuredImage} link={link} tech={tech} github={github} title={title} />
          </Col>
        )
      })}
    </Row>
  </Container>
</Layout>
)}

export default Projects

export const projectsQuery = graphql`query posts {
  allMarkdownRemark(filter: {
    frontmatter: {
      tech: {ne: null}
    }
  },
  sort: {
    fields: frontmatter___order, order: ASC
  }) {
    edges {
      node {
        frontmatter {
          link
          github
          tech
          title
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 992) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        html
        id
      }
    }
  }
}
`; 