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
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "About/:id",
        element: <About />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product-create",
        element: <ProductCreate />,
      },
      {
        path: "/product/product-edit/:id",
        element: <ProductEdit />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile-create",
        element: <ProfileCreate />,
      },
      {
        path: "/profile-edit",
        element: <ProfileEdit />,
      },
      {
        path: "/teamByUs",
        element: <TeamByUs />,
      },
      {
        path: "/liveSite/:id",
        element: <LiveSite />,
      },
    ],
  },

  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotPassword",
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
