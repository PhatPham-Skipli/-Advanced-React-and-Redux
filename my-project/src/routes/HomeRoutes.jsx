import HomePage from "../pages/HomePage";
import CommentPage from "../pages/CommentPage";
import HomeLayout from "../Layouts/HomeLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const HomePageRoutes = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "comments",
        element: <CommentPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      }
    ],
  },
];

export default HomePageRoutes;