import React from "react";
import { useSelector } from "react-redux";
import InfoComponents from "./Info";
import RequestComponents from "./Request";

const ApiComponents = () => {
  const
    currentEndpoint = useSelector(({ app }) => app.organization.currentEndpoint);

  return (
    <div className="api-docs-content" style={{ position: "relative", width: "100%" }}>
      {
        currentEndpoint ?
          <>
            <InfoComponents />
            <RequestComponents />
          </> : "Lütfen Seçim Yapın"
      }
    </div>
  );
}

export default ApiComponents;