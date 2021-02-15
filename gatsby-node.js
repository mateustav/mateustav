/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const path = require(`path`);

// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions;
//   const blogPostTemplate = path.resolve(`src/templates/blog.js`);
//   const result = await graphql(`
//     {
//       allMarkdownRemark(
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             frontmatter {
//               path
//             }
//           }
//         }
//       }
//     }
//   `);

  // const posts = result.data.allMarkdownRemark.edges;
  // posts.forEach(({ node }) => {
  //   createPage({
  //     path: node.frontmatter.path,
  //     component: blogPostTemplate,
  //     context: {
  //       // additional data can be passed via context
  //       slug: node.frontmatter.path
  //     },
  //   });
  // });

  // // Create blog post list pages
  // const postsPerPage = 5;
  // const numPages = Math.ceil(posts.length / postsPerPage);
  // Array.from({ length: numPages }).forEach((_, i) => {
  //   createPage({
  //     path: i ? `/posts/${i + 1}/` : `/posts/` ,
  //     component: path.resolve("./src/templates/blog-list.js"),
  //     context: {
  //       limit: postsPerPage,
  //       skip: i * postsPerPage,
  //       numPages,
  //       currentPage: i + 1,
  //     },
  //   });
  // });

  // Handle errors
  // if (result.errors) {
  //   reporter.panicOnBuild(`Error while running GraphQL query.`)
  //   return
  // }
// };