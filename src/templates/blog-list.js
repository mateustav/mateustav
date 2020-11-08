import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import PostLink from "../components/postLink";
import Pager from "../components/pager";
import SEO from "../components/seo";

export default function PostList({
  data,
  pageContext,
}) {
  const { allMarkdownRemark } = data; // data.allMarkdownRemark holds the posts
  const { edges } = allMarkdownRemark;
  const { currentPage } = pageContext;
  const title = currentPage === 1 ? `Hi, I'm Mat!` : `Page ${currentPage.toString()}`;
  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title={`${title}`} />
      { 
        edges.map(post =>
          <PostLink post={post.node} key={post.node.id} />
        )
      }
      <Pager pageContext={pageContext} />
    </Layout>
  )
}

export const query = graphql`
query ($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    sort: {
      fields: [frontmatter___updated_at, frontmatter___date]
      order: [ASC, DESC]
    }
    skip: $skip
    limit: $limit
  )
  {
    edges {
      node {
        id
        excerpt(
          pruneLength: 240
          truncate: true
        )
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 992) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          path
          tag
          title
          updated_at(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
}
`;