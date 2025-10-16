import { createBrowserRouter } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';

const routes = [
    ...HomeRoutes,
    ...AuthRoutes,
    ...AdminRoutes
];

const router = createBrowserRouter(routes);

export default router;