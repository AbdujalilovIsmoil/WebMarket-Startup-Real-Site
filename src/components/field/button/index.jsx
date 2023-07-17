import React, { memo } from "react";

const index = memo(({ disabled, type, className, children, onClick, id }) => {
  return (
    <>
      <button
        id={id}
        type={type}
        className={className}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
});

export default index;
