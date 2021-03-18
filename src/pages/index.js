import React from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import Stack from "../components/stack"
import SEO from "../components/seo"


const Home = ({
  data
}) => {
  return (
  <Layout pageInfo={{ pageName: "Home" }}>
    <SEO title="Hi, I'm Mat!" />
    <Header/>
    <Stack />
  </Layout>
)}

export default Home
