import React, { memo } from "react";

const index = memo(({ type, className, children, onClick, id }) => {
  return (
    <>
      <button type={type} className={className} onClick={onClick} id={id}>
        {children}
      </button>
    </>
  );
});

export default index;
