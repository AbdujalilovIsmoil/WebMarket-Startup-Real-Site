import React, { memo } from "react";
import ReactPaginate from "react-paginate";

const index = memo(({ pageCount, onPageChange }) => {
  return (
    <>
      <ReactPaginate
        nextLabel=">"
        previousLabel="<"
        breakLabel="..."
        pageCount={pageCount}
        nextClassName="next-style"
        onPageChange={onPageChange}
        pageLinkClassName="page-link"
        nextLinkClassName="next-style"
        breakClassName="paginate-dots"
        containerClassName="pagination"
        previousClassName="previos-style"
        activeLinkClassName="page-active"
        previousLinkClassName="previos-style"
      />
    </>
  );
});

export default index;
