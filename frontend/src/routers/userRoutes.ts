import { lazy } from 'react';
import { ROUTES } from './constants';

const HomePage = lazy(() => import('@/pages/Home'));
const LoginPage = lazy(() => import('@/pages/Login'));
const RegisterPage = lazy(() => import('@/pages/Register'));
const DetaildFacilityPage = lazy(() => import('@/pages/Player/DetaildFacility'));


export const userRoutes = [
  {
    index: true, element: HomePage
  },
  {
    path: ROUTES.LOGIN, element: LoginPage
  },
  {
    path: ROUTES.REGISTER, element: RegisterPage
  },
  {
    path: ROUTES.FACILITY_DETAIL, element: DetaildFacilityPage
  },
 
];
