import { useRoutes } from 'react-router-dom';
import MainRoutes from "./MainRoutes";
import OrganizationRoutes from "./OrganizationRoutes";

export default function Router() {
  return useRoutes([MainRoutes, OrganizationRoutes]);
};