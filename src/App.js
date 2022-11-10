import { Layout } from "antd";
import "assets/less/main.less";
import Logo from "components/Logo";
import { Route, Routes, Navigate } from "react-router-dom";
import appRoutes from "routes";

function App() {
  return (
    <Layout>
      <Layout.Header>
        <Logo />
      </Layout.Header>
      <Layout.Content>
        <Routes>
          {
            appRoutes.map(route => (
              <Route key={route.name} path={route.path} element={<route.component />} />
            ))
          }
          <Route path="*" element={<Navigate to="/organizations" />} />
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

export default App;
