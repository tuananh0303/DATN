import { createBrowserRouter } from 'react-router-dom';
import { userRoutes } from './userRoutes';
import { ownerRoutes } from './ownerRoutes';
import { UserLayout } from './layouts/UserLayout';
import { OwnerLayout } from './layouts/OwnerLayout';
import ErrorPage from '@/pages/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: userRoutes.map(route => ({
      index: route.index,
      path: route.path,
      element: <route.element />
    }))
  },
  {
    path: '/owner',
    element: <OwnerLayout />,
    errorElement: <ErrorPage />,
    children: ownerRoutes.map(route => ({
      path: route.path,
      element: <route.element />
    }))
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]); 