import React, { memo } from "react";
import { ForgotPassword } from "components/layout";

const index = memo(() => {
  return (
    <>
      <div className="container">
        <section className="forgotPassword">
            <ForgotPassword />
        </section>
      </div>
    </>
  );
});

export default index;
