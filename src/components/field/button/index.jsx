const index = ({ children, ...props }) => {
  return (
    <>
      <button {...props}>{children}</button>
    </>
  );
};

export default index;
