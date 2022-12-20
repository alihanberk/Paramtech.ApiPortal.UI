import { lazy } from 'react';
import MainLayout from "components/Layout/MainLayout";
import Loadable from 'components/Loadable';

const
    OrganizationsPage = Loadable(lazy(() => import('../pages/Organizations'))),
    OrganizationPage = Loadable(lazy(() => import('../pages/Organization'))),
    ProductsPage = Loadable(lazy(() => import('../pages/Product'))),
    EndpointPages = Loadable(lazy(() => import('../pages/Developer')));

const OrganizationRoutes = {
    path: '/',
    element: (
        <MainLayout withSider />
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
        {
            path: "/organizations/:organizationId/:applicationId/:endpointId",
            element: <EndpointPages />,
        },
    ],
};

export default OrganizationRoutes;