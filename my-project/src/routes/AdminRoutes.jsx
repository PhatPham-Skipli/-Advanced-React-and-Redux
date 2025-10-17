import { AccountProvider } from "../context/admin/AccountContext";
import { CommentProvider } from "../context/admin/CommentContext";
import AdminLayout from "../Layouts/AdminLayout";
import AdminAccount from "../pages/admin/AdminAccount";
import AdminComment from "../pages/admin/AdminComment";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "accounts",
        element: <AccountProvider><AdminAccount/></AccountProvider>,
      },
      {
        path: "comments",
        element: <CommentProvider><AdminComment /></CommentProvider>,
      }
    ],
  },
];

export default AdminRoutes;