import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiDocumentation } from "store/features/app";
import Sider from "./Sider";
import { Layout } from "antd";
import InfoComponents from "./Info";
import RequestComponents from "./Request";

const ApiComponents = () => {
  const
    dispatch = useDispatch(),
    currentEndpoint = useSelector(({ app }) => app.currentEndpoint);

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
          {
            currentEndpoint ?
              <>
                <InfoComponents />
                <RequestComponents />
              </> : "Lütfen Seçim Yapın"
          }
        </Layout.Content>
      </div>
    </Layout>
  );
}

export default ApiComponents;