import { lazy } from 'react';
import MainLayout from "components/Layout/MainLayout";
import Loadable from 'components/Loadable';

const OrganizationsPage = Loadable(lazy(() => import('../pages/Organizations')));
const OrganizationPage = Loadable(lazy(() => import('../pages/Organization')));
const ProductsPage = Loadable(lazy(() => import('../pages/ProductOld')));

const OrganizationRoutes = {
    path: '/',
    element: (
        <MainLayout />
    ),
    children: [
        {
            path: "/organizations",
            element: <OrganizationsPage />,
        },
        {
            path: "/organizations/:organizationId",
            element: <OrganizationPage />,
        },
        {
            path: "/organizations/:organizationId/:applicationId",
            element: <ProductsPage />,
        },    
    ],
  };
  
  export default OrganizationRoutes;