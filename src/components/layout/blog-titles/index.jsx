import React, { memo } from "react";

const index = memo(() => {
  return (
    <>
      <div className="blog-titles">
        <h2 className="blog-titles__title">Welcome to Statichunt Blog</h2>
        <p className="blog-titles__text">
          Get all the news about JAMStack from Statichunt.
        </p>
      </div>
    </>
  );
});

export default index;
