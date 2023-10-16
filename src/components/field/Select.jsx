const index = ({ children, ...props }) => {
  return (
    <>
      <select {...props}>{children}</select>
    </>
  );
};
export default index;
