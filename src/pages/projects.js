import React from "react"
// import { Link } from "gatsby"
import { Container, Row, Col, Card } from "react-bootstrap"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { faCss3Alt, faJs, faBootstrap, faWordpressSimple, faNodeJs } from '@fortawesome/free-brands-svg-icons'
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"


const Projects = ({
  data
}) => {
  return (
  <Layout pageInfo={{ pageName: "Projects" }}>
  <SEO title="Projects" />

  <Container>
    <Row>
      <Col>
        <h1 className="mb-3 text-capitalize">Stuff I've worked on</h1>

        <Card>
          <Card.Body>
            <Card.Title>Wishpond.com</Card.Title>
            <Card.Text>
              Since 2015, I've been in charge of Wishpond's marketing site including its style, theming, style, deploy and more.

              Talk about test. Talk about Sass integration
              Wordpress Network
              Speed
              Flex
            </Card.Text>
            <Card.Text>
              Technology used:
              <ul>
                <li>Docker</li>
                <li>Continuous deployment via GitHub</li>
                <li>PHP 7.2</li>
                <li>WordPress</li>
                <li>Sass</li>
                <li>Bootstrap 4</li>
              </ul>
            </Card.Text>
            <Card.Link href="https://www.wishpond.com/">View Live</Card.Link>
          </Card.Body>
        </Card>

        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Blog.Wishpond.com</Card.Title>
            <Card.Text>
              Also since 2015, I've been the sole maintainer of the Wishpond blog. This blog is a result of a successful migration from Tumblr. Wishpond wanted a modern blogging platform that had a good balance between performance and flexibility. Ghost seemed like a good fit so I moved all the content in, and customized the platform's default URL structure inside its core to successfully keep the domain's SEO during the transition.
              <br/><br/>
              The blog still makes use of Bootstrap 3 to maximize its reach to every possible visitor, no matter which browser they come from.
            </Card.Text>
            <Card.Text>
              Technology used:
              <ul>
                <li>Docker</li>
                <li>Continuous deployment via GitHub</li>
                <li>Node.js</li>
                <li>Express</li>
                <li>Ghost</li>
                <li>Handlebars</li>
                <li>Sass</li>
                <li>Bootstrap 3</li>
              </ul>
            </Card.Text>
            <Card.Link href="https://blog.wishpond.com/">View Live</Card.Link>
          </Card.Body>
        </Card>

        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Emojiq</Card.Title>
            <Card.Text>
              Built in 2021, this Slack bot turn Slack messages emojis when it finds a match. I chose to use Node.js as I wanted to try out object-oriented programming techniques through modern Javascript syntax (JS classes) as well as try out PostgreSQL for the first time (it's so powerful!)
            </Card.Text>
            <Card.Text>
              Technology used:
              <ul>
                <li>DigitalOcean App Platform</li>
                <li>Continuous deployment via GitHub</li>
                <li>Node.js</li>
                <li>Express</li>
                <li>React</li>
                <li>Slack API</li>
              </ul>
            </Card.Text>
            <Card.Link href="https://blog.wishpond.com/">View Live</Card.Link>
          </Card.Body>
        </Card>

        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Matttt.ca</Card.Title>
            <Card.Text>
              The site you're seeing right now! As soon as I heard about this static site generator powered by React, I knew that would've been the core of the tech stack. Gatsby allowed me to create this crazy fast site while let me expand it with the plugins (and still keeping its excellent performance).
            </Card.Text>
            <Card.Text>
              Technology used:
              <ul>
                <li>Netlify</li>
                <li>Continuous deployment via GitHub</li>
                <li>Gatsby.js</li>
                <li>React Boostrap</li>
                <li>FontAwesome 5 Pro</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</Layout>
)}

export default Projects

export const imageQuery = graphql`query getImages2 {
  cash: file(relativePath: { eq: "johnny-cash-too-long.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 738) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  family: file(relativePath: { eq: "gatsby-astronaut.png" }) {
    childImageSharp {
      fluid(maxWidth: 738) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;