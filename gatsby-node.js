const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsGeneric {
          edges {
            node {
              slug
              treeParent {
                slug
              }
            }
          }
        }
      }
    `).then(({ data }) => {
      // Work
      data.allDatoCmsWork.edges.map(({ node }) => {
        const pathname = `works/${node.slug}`;
        createPage({
          path: pathname,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            pathname,
            slug: node.slug
          }
        });
      });

      // Generic
      data.allDatoCmsGeneric.edges.map(({ node }) => {
        const parentSlug = node.treeParent ? node.treeParent.slug : "";
        const pathname = `${parentSlug}/${node.slug}`;
        createPage({
          path: pathname,
          component: path.resolve(`./src/templates/generic.js`),
          context: {
            pathname,
            slug: node.slug
          }
        });
      });

      resolve();
    });
  });
};
