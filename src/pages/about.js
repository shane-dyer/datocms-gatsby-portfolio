import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import Layout from "../components/layout";

const About = ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsAbout.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsAbout.title}</h1>
        <p className="sheet__lead">{data.datoCmsAbout.subtitle}</p>
        <div className="sheet__gallery">
          <Img fluid={data.datoCmsAbout.photo.fluid} />
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsAbout.bioNode.childMarkdownRemark.html
          }}
        />
      </div>
    </article>
  </Layout>
);

export default About;

export const query = graphql`
  query AboutQuery {
    datoCmsAbout {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
