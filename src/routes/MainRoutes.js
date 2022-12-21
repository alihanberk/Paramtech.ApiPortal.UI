import { lazy } from 'react';
import MainLayout from "components/Layout/MainLayout";
import Loadable from 'components/Loadable';

const HomePage = Loadable(lazy(() => import('../pages/Home')));
const FaqPage = Loadable(lazy(() => import('../pages/Faq')));


const MainRoutes = {
    path: '/',
    element: (
        <MainLayout />
    ),
    children: [
        {
            path: "/home",
            element: <HomePage />,
        },
        {
            path: "/faq",
            element: <FaqPage />,
      },
    ],
  };
  
  export default MainRoutes;