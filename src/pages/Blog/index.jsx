import React, { memo } from "react";
import { BlogTitles, BlogCards } from "components/layout";

const index = memo(() => {
  return (
    <>
      <section className="blog">
        <div className="container">
          <BlogTitles />
          <BlogCards />
        </div>
      </section>
    </>
  );
});

export default index;
