import React from "react"
// import { Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"


const AboutMePage = ({
  data
}) => {
  const cashQuote = data.cash.childImageSharp.fluid;
  // console.log(headerImage);
  // console.log(cashQuote);
  return (
  <Layout pageInfo={{ pageName: "About Me" }}>
  <SEO title="About Me" />
  <Header/>

  <Container className="about-me-section">
    <Row className="justify-content-center">
      <Col sm={8}>
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

        <p><strong>Hello, my name is Mateus</strong> – or Mat for short. I've heard so many variants of my name spoken in different languages (ask me about that when we meet!) that I find it easier to just introduce myself using the first three letters of my name.</p>

        <p>I've been working as a CRO specialist/growth hacker at <a href="https://www.wishpond.com/">Wishpond</a> for the past few years, and after comings and goings, I also became in charge to maintain the company's blog and marketing website, that are powered by Ghost and WordPress respectively, and both use Bootstrap as their framework. <strong>And that's where my passion for web development started.</strong></p>

        <p>Ever since, I haven't stopped fiddling around with programming in my spare time. I've built WordPress sites and created small apps. And found myself using Javascript most of the time, in both front and backend (much love Node! <span role="img" aria-label="fist emoji">✊</span>). Though I've programmed with Ruby as well and had a significant interest in Rails. This is the technology I use and talk about the most:</p>

        <p>This blog itself is a project like that, and I use it to talk about apps I'm building, languages I'm learning, and anything else I'm exploring, about development, tech and marketing, which I can't deny – it's what I love the most, and what I work with. So because of my experience in both worlds, the idea is to collide them by helping developers with a little bit of marketing, and digital marketers with a little bit of dev.</p>

        <p>I'm originally from a country region in the state of São Paulo in Brazil, where I lived until I was 18, but my entire academic and work experiences have happened in Vancouver, BC, where I currently reside with my wife and two boys since around 2010.</p>

        <p>In my free time, I'm usually coaching my older son with his soccer skills, which I've inherited from my ancestors <span role="img" aria-label="Brazilian flag">🇧🇷</span>. In the summer, you will often find me bbqing or biking around the city with my family; When it's rainy (aka during 3/4 of the year), I'm playing my guitar and improving my musician abilities. Oh, I'm also a big gamer so if you ever feel like playing Rainbow 6 Siege, you can ocasionally find me on Xbox Live.</p>
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
}
`;