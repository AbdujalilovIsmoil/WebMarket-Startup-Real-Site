import { Outlet } from "react-router-dom";
import { Header } from "components/layout";

const Routes = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Routes;
