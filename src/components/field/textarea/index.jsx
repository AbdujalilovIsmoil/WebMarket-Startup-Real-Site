import React, { memo } from "react";

const index = memo(
  ({ children, className, placeholder, required, value, onChange }) => {
    return (
      <>
        <textarea
          value={value}
          required={required}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
        >
          {children}
        </textarea>
      </>
    );
  }
);

export default index;
