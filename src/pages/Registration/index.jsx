import React, { memo } from "react";
import { Registration } from "components/layout";

const index = memo(() => {
  return (
    <>
      <div className="container">
        <section className="registration">
          <Registration />
        </section>
      </div>
    </>
  );
});

export default index;
