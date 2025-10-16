import HomePage from "../pages/HomePage";
import CommentPage from "../pages/CommentPage";
import HomeLayout from "../Layouts/HomeLayout";

const HomeRoutes = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "comments",
        element: <CommentPage />,
      }
    ],
  },
];

export default HomeRoutes;