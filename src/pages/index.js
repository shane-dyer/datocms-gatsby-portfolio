import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Layout from "../components/layout";
import PromoBanner from "../slices/PromoBanner";
import ThreeUP from "../slices/ThreeUP";

const sliceMap = {
  DatoCmsSlicePromoBanner: PromoBanner,
  DatoCmsSliceThreeup: ThreeUP
};

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Masonry className="showcase">
        {data.allDatoCmsWork.edges.map(({ node: work }) => (
          <div key={work.id} className="showcase__item">
            <figure className="card">
              <Link to={`/works/${work.slug}`} className="card__image">
                <Img fluid={work.coverImage.fluid} />
              </Link>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/works/${work.slug}`}>{work.title}</Link>
                </h6>
                <div className="card__description">
                  <p>{work.excerpt}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>
      {data.datoCmsHome.slices.map(slice => {
        const SliceComponent = sliceMap[slice.__typename];
        if (SliceComponent) {
          return <SliceComponent key={slice.id} {...slice} />;
        }
        return null;
      })}
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    datoCmsHome {
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
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
