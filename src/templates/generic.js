import React from "react";
import { graphql, Link } from "gatsby";
// import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import PromoBanner from "../slices/PromoBanner";
import ThreeUP from "../slices/ThreeUP";

const sliceMap = {
  DatoCmsSlicePromoBanner: PromoBanner,
  DatoCmsSliceThreeup: ThreeUP
};

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      {/* <HelmetDatoCms seo={data.datoCmsGeneric.seoMetaTags} /> */}
      <div className="sheet__inner">
        {data.datoCmsGeneric.treeChildren ? (
          <ul>
            {data.datoCmsGeneric.treeChildren.map(child => (
              <li key={child.slug}>
                <Link to={child.slug}>{child.title}</Link>
              </li>
            ))}
          </ul>
        ) : null}
        <h1 className="sheet__title">{data.datoCmsGeneric.title}</h1>
        <div
          className="sheet__lead"
          dangerouslySetInnerHTML={{ __html: data.datoCmsGeneric.intro }}
        />
      </div>
    </article>
    {data.datoCmsGeneric.slices.map(slice => {
      const SliceComponent = sliceMap[slice.__typename];
      if (SliceComponent) {
        return <SliceComponent key={slice.id} {...slice} />;
      }
      return null;
    })}
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
        ... on DatoCmsSliceThreeup {
          id
          title
          items {
            title
            content
            image {
              url
            }
          }
        }
        ... on DatoCmsSlicePromoBanner {
          id
          title
          description
          image {
            url
          }
          backgroundColour {
            hex
          }
          buttons {
            id
            title
            link {
              ... on DatoCmsHome {
                slug
              }
              ... on DatoCmsAbout {
                slug
              }
              ... on DatoCmsWork {
                slug
              }
              ... on DatoCmsGeneric {
                slug
              }
            }
          }
        }
      }
    }
  }
`;
