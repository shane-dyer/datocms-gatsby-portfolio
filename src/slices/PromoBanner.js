import * as React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

const PromoBanner = ({
  title,
  description,
  image,
  backgroundColour,
  buttons
}) => (
  <section
    className="overflow-hidden"
    style={{ backgroundColor: backgroundColour.hex }}
  >
    <div className="my-10 text-center md:py-0">
      <div className="relative inline-flex flex-col items-center justify-center md:h-95">
        <h2 className="mb-6 text-3xxl font-semibold text-white">{title}</h2>

        {description && (
          <p className="mb-7 max-w-3sm leading-normal text-white">
            {description}
          </p>
        )}

        {buttons && buttons.length ? (
          <div>
            {buttons.map(({ id, link, title }, index) => (
              <Link
                key={id}
                to={link.slug}
                className={classNames(
                  "inline-block w-60 mb-2 py-5 border text-xs font-semibold uppercase text-white text-center tracking-wide hover:opacity-75 transition",
                  {
                    "bg-black border-black": index === 0,
                    "sm:ml-3 border-white": index !== 0
                  }
                )}
              >
                {title}
              </Link>
            ))}
          </div>
        ) : null}

        {image && (
          <div className="">
            <img src={image.url} style={{ maxWidth: "200px" }} />
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PromoBanner;
