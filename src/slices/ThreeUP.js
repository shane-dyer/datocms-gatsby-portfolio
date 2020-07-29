import * as React from "react";

const ThreeUP = ({ title, items }) => (
  <section>
    <h1>{title}</h1>
    {items.map(({ title, content, image }) => (
      <div>
        <img src={image.url} style={{ maxWidth: "100px" }} />
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    ))}
  </section>
);

export default ThreeUP;
