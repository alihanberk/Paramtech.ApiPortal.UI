import { lazy } from 'react';
import MainLayout from "components/Layout/MainLayout";
import Loadable from 'components/Loadable';
import { Navigate } from 'react-router-dom';

const HomePage = Loadable(lazy(() => import('../pages/Home')));
const FaqPage = Loadable(lazy(() => import('../pages/Faq')));


const MainRoutes = {
    path: '/',
    element: (
        <MainLayout />
    ),
    children: [
         {
            path: "/",
            element: <Navigate to="/home" /> ,
        },
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