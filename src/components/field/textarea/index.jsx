const index = ({ children, ...props }) => {
  return (
    <>
      <textarea {...props}>{children}</textarea>
    </>
  );
};
export default index;
