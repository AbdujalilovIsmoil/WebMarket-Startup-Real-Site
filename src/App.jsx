import Routes from "./Routes";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Product = lazy(() => import("./pages/Product"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LiveSite = lazy(() => import("./pages/LiveSite"));
const TeamByUs = lazy(() => import("./pages/TeamByUs"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit"));
const ProductEdit = lazy(() => import("./pages/ProductEdit"));
const Registration = lazy(() => import("./pages/Registration"));
const ProfileCreate = lazy(() => import("./pages/ProfileEdit"));
const ProductCreate = lazy(() => import("./pages/ProductCreate"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Routes />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "pages/blog",
        element: <Blog />,
      },
      {
        path: "pages/about/:id",
        element: <About />,
      },
      {
        path: "pages/product",
        element: <Product />,
      },
      {
        path: "pages/product-create",
        element: <ProductCreate />,
      },
      {
        path: "pages/product/product-edit/:id",
        element: <ProductEdit />,
      },
      {
        path: "pages/profile",
        element: <Profile />,
      },
      {
        path: "pages/profile-create",
        element: <ProfileCreate />,
      },
      {
        path: "pages/profile-edit",
        element: <ProfileEdit />,
      },
      {
        path: "pages/teamByUs",
        element: <TeamByUs />,
      },
      {
        path: "pages/liveSite/:id",
        element: <LiveSite />,
      },
    ],
  },

  {
    path: "pages/registration",
    element: <Registration />,
  },
  {
    path: "pages/login",
    element: <Login />,
  },
  {
    path: "pages/forgotPassword",
    element: <ForgotPassword />,
  },
]);

const App = () => {
  return (
    <main className="main">
      <ToastContainer />
      <Suspense fallback="">
        <RouterProvider router={router} />
      </Suspense>
    </main>
  );
};

export default App;
