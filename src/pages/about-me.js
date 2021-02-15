import React from "react"
// import { Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { faCss3Alt, faJs, faBootstrap, faWordpressSimple, faNodeJs } from '@fortawesome/free-brands-svg-icons'
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"


const AboutMePage = ({
  data
}) => {
  const astronaut = data.family.childImageSharp.fluid;
  const cashQuote = data.cash.childImageSharp.fluid;
  // console.log(headerImage);
  // console.log(cashQuote);
  return (
  <Layout pageInfo={{ pageName: "About Me" }}>
  <SEO title="About Me" />
  <Header/>

  <Container className="about-me-section">
    <Row>
      <Col>
        <h2 className="mb-3 text-capitalize">About me in 30 seconds</h2>
        <hr />
        <Img fluid={cashQuote} alt="test" />
        <ul className="mb-5">
          <li>Marketing professional with 8 years of experience</li>
          <li>Web development hobbyist</li>
          <li>Father &amp; Husband</li>
          <li>A big Johnny Cash enthusiast</li>
        </ul>

        <h2 className="text-capitalize mt-5">About me in detail</h2>

        <hr />

        <Img fluid={astronaut} alt="test" />

        <p><strong>Hello, my name is Mateus</strong> – or Mat for short. I've heard so many variants of my name spoken in different languages (ask me about that when we meet!) that I find it easier to just introduce myself using the first three letters of my name.</p>

        <p>I've been working as a CRO specialist/growth hacker at <a href="https://www.wishpond.com/">Wishpond</a> for the past few years, and after comings and goings, I also became in charge to maintain the company's blog and marketing website, that are powered by Ghost and WordPress respectively, and both use Bootstrap as their framework. <strong>And that's where my passion for web development started.</strong></p>

        <p>Ever since, I haven't stopped fiddling around with programming in my spare time. I've built WordPress sites and created small apps. And found myself using Javascript most of the time, in both front and backend (much love Node! <span role="img" aria-label="fist emoji">✊</span>). Though I've programmed with Ruby as well and had a significant interest in Rails. This is the technology I use and talk about the most:</p>

        <p>This blog itself is a project like that, and I use it to talk about apps I'm building, languages I'm learning, and anything else I'm exploring, about development, tech and marketing, which I can't deny – it's what I love the most, and what I work with. So because of my experience in both worlds, the idea is to collide them by helping developers with a little bit of marketing, and digital marketers with a little bit of dev.</p>

        <p>I'm originally from a country region in the state of São Paulo in Brazil, where I lived until I was 18, but my entire academic and work experiences have happened in Vancouver, BC, where I currently reside with my wife and two boys since around 2010.</p>

        <p>In my free time, I'm usually coaching my older son with his soccer skills, which I've inherited from my ancestors <span role="img" aria-label="Brazilian flag">🇧🇷</span>. In the summer, you will often find me bbqing or biking around the city with my family; When it's rainy (aka during 3/4 of the year), I'm playing my guitar and improving my musician abilities. Oh, I'm also a big gamer so if you ever feel like playing Rainbow 6 Siege, you can ocasionally find me on Xbox Live.</p>

        <h2 className="mb-5">Technologies I Use</h2>

        <p>Praesent facilisis, purus non vulputate porttitor, urna felis fermentum tortor, et elementum est nisi eu felis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>

        <Row id="tech-icons" className="mb-5">
          <Col xs={6} md={{ span: 3, offset: 1}} className="my-3 mb-md-5">
            <div className="position-relative" data-target="#css" data-tooltip="CSS">
              <FontAwesomeIcon icon={faCss3Alt} id="css" className="fa-5x fa-fw m-auto w-100" />
            </div>
          </Col>
          <Col xs={6} md={3} className="my-3 mb-md-5">
            <div className="d-flex h-100 w-100" data-target="#javascript" data-tooltip="Javascript">
                <FontAwesomeIcon icon={faJs} id="javascript" className="fa-5x fa-fw m-auto w-100" style={{zIndex: 2}} />
                <FontAwesomeIcon icon={faSquareFull} className=" fa-2x fa-stack-2x fa-fw m-auto" />
            </div>
          </Col>
          <Col xs={6} md={3} className="my-3 mb-md-5">
            <div className="position-relative" data-target="#bootstrap" data-tooltip="Bootstrap">
              <FontAwesomeIcon icon={faBootstrap} id="bootstrap" className="fa-5x fa-fw m-auto w-100" />
            </div>
          </Col>
          <Col xs={6} md={{ span: 3, offset: 1}} className="my-3">
            <div className="position-relative" data-target="#wordpress" data-tooltip="WordPress" style={{color: `blue`}}>
            <FontAwesomeIcon icon={faWordpressSimple} id="wordpress" className="fa-5x fa-fw m-auto w-100" />
            </div>
          </Col>
          <Col xs={6} md={3} className="my-3">
            <div className="position-relative" data-target="#gatsby" data-tooltip="GatsbyJS">
              <svg role="img" id="gatsby" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg-inline--fa fa-w-12 fa-5x fa-fw m-auto w-100" fill="currentColor"><title>Gatsby icon</title><path d="M12.001.007C5.326.007.007 5.326.007 12S5.326 23.995 12 23.995s11.994-5.319 11.994-11.994S18.676.007 12.001.007zM2.614 12.105l9.283 9.283c-5.111 0-9.283-4.172-9.283-9.283zm11.473 9.074L2.823 9.915C3.76 5.743 7.516 2.614 12 2.614a9.476 9.476 0 0 1 7.614 3.86L18.259 7.62a7.657 7.657 0 0 0-6.362-3.337A7.555 7.555 0 0 0 4.7 9.393l9.804 9.805c2.4-.835 4.276-2.92 4.798-5.424h-4.068v-1.773h6.154c0 4.485-3.129 8.24-7.301 9.178z"/></svg>
            </div>
          </Col>
          <Col xs={6} md={3} className="my-3">
            <div className="position-relative" data-target="#nodejs" data-tooltip="NodeJS">
            <FontAwesomeIcon icon={faNodeJs} id="nodejs" className="fa-5x fa-fw m-auto w-100" />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
</Layout>
)}

export default AboutMePage

export const imageQuery = graphql`query getImages {
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