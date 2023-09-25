import { Outlet } from "react-router-dom";
import { Header } from "components/layout";

const routes = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default routes;
