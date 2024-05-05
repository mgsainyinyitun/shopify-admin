import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import MerchantPage from 'src/pages/blog';
import UserEditInfoMain from 'src/sections/user/UserEditInfoMain';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const login = localStorage.getItem('login');

  console.log(login);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: login==='true' ? <IndexPage /> : <Navigate to="/login" replace />, index: true },
        { path: 'user', element: login==='true' ? <UserPage /> : <Navigate to="/login" replace /> },
        { path: 'products', element: login==='true' ? <ProductsPage /> : <Navigate to="/login" replace /> },
        { path: 'merchants', element: login==='true' ? <MerchantPage /> : <Navigate to="/login" replace /> },
        { path: 'user/edit/:id', element: login==='true' ? <UserEditInfoMain /> : <Navigate to="/login" replace /> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
