import React, { memo } from "react";

const index = memo(
  ({ className, children, value, onChange, name }) => {
    return (
      <>
        <select
          required
          value={value}
          name={name}
          onChange={onChange}
          className={className}
        >
          {children}
        </select>
      </>
    );
  }
);

export default index;
