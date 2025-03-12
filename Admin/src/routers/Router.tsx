import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { routes } from './routes';
import ErrorPage from '@/pages/NotFound/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: routes.map(route => ({
      path: route.path,
      element: <route.element />
    }))
  }
]);
