import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  return (
    <ReactPaginate
      {...props}
      nextLabel=">"
      breakLabel="..."
      previousLabel="<"
      nextClassName="next-style"
      pageLinkClassName="page-link"
      nextLinkClassName="next-style"
      breakClassName="paginate-dots"
      containerClassName="pagination"
      previousClassName="previos-style"
      activeLinkClassName="page-active"
      previousLinkClassName="previos-style"
    />
  );
};

export default Pagination;
