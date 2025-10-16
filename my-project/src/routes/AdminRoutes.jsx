import AdminLayout from "../Layouts/AdminLayout";
import AdminAccount from "../pages/admin/AdminAccount";
import AdminComment from "../pages/admin/AdminComment";

const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "accounts",
        element: <AdminAccount/>,
      },
      {
        path: "comments",
        element: <AdminComment />,
      }
    ],
  },
];

export default AdminRoutes;