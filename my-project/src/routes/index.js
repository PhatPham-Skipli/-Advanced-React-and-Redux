import { createBrowserRouter } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';

const routes = [
    ...HomeRoutes,

    // {
    //     path: '*',
    //     element: <NotFoundPage />
    // }
];

const router = createBrowserRouter(routes);

export default router;
