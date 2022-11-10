import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiDocumentation } from "store/features/app";
import Info from "./Info";
import Documentation from "./Documentation";
import Sider from "./Sider";
import { Layout } from "antd";

const ApiComponents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApiDocumentation("https://test_tenantapi.e-cozum.com/swagger/v1/swagger.json"))
  }, [dispatch]);

  return (
    <Layout>
      <Layout.Sider width={300} style={{ zIndex: 1001 }}>
        <Sider />
      </Layout.Sider>
      <div className="api-docs-content" style={{ position: "relative", width: "100%" }}>
        <Layout.Content className="container">
          <Info />
          <Documentation />
        </Layout.Content>
      </div>
    </Layout>
  );
}

export default ApiComponents;