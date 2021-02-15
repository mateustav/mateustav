import React from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"


const Home = ({
  data
}) => {
  return (
  <Layout pageInfo={{ pageName: "Home" }}>
    <SEO title="Home" />
    <Header/>
  </Layout>
)}

export default Home
