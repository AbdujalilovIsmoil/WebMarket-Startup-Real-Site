import React, { memo } from "react";

const index = memo(({ className, children, required, value, onChange }) => {
  return (
    <>
      <select
        value={value}
        required={required}
        onChange={onChange}
        className={className}
      >
        {children}
      </select>
    </>
  );
});

export default index;
