import React, { memo } from "react";
import { Login } from "components/layout";

const index = memo(() => {
  return (
    <>
      <div className="container">
        <div className="login">
          <Login />
        </div>
      </div>
    </>
  );
});

export default index;
