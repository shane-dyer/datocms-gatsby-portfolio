import React from "react";
import { graphql, Link } from "gatsby";
// import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      {/* <HelmetDatoCms seo={data.datoCmsGeneric.seoMetaTags} /> */}
      <div className="sheet__inner">
        {data.datoCmsGeneric.treeChildren ? (
          <ul>
            {data.datoCmsGeneric.treeChildren.map(child => (
              <li key={child.slug}>
                <Link to={`${child.slug}`}>{child.title}</Link>
              </li>
            ))}
          </ul>
        ) : null}
        <h1 className="sheet__title">{data.datoCmsGeneric.title}</h1>
        <div
          className="sheet__lead"
          dangerouslySetInnerHTML={{ __html: data.datoCmsGeneric.intro }}
        />
        {data.datoCmsGeneric.slices &&
          data.datoCmsGeneric.slices.map(child => (
            <div key={child.id}>
              <hr />
              <h5>{child.title}</h5>
              <p>{child.text}</p>
              {child.image && <img src={child.image.url} />}
            </div>
          ))}
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query GenericQuery($slug: String!) {
    datoCmsGeneric(slug: { eq: $slug }) {
      title
      intro
      treeChildren {
        title
        slug
      }
      slices {
        ... on DatoCmsHeroCard {
          id
          title
          text
          image {
            url
          }
        }
        ... on DatoCmsPromoBanner {
          id
          title
          text
          image {
            url
          }
        }
      }
    }
  }
`;
