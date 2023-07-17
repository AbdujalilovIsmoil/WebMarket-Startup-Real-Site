import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/layout";

const routes = memo(() => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
});

export default routes;
