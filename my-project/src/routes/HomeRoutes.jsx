import HomePage from "../pages/HomePage";
import CommentPage from "../pages/CommentPage";
import HomeLayout from "../Layouts/HomeLayout";
import { CommentProvider } from "../context/CommentContext";
import ProtectedRoute from "./ProtectedRoute";

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
        element: <ProtectedRoute />,
        children: [
          {
            path: "comments",
            element: (
              <CommentProvider>
                <CommentPage />
              </CommentProvider>
            ),
          },
        ],
      },
    ],
  },
];

export default HomeRoutes;