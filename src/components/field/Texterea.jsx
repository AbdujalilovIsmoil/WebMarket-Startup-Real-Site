const Texterea = ({ children, ...props }) => {
  return (
    <>
      <textarea {...props}>{children}</textarea>
    </>
  );
};
export default Texterea;
