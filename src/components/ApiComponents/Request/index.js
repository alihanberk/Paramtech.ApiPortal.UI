import { Divider, Row, Col } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Parameters from "./Parameters";
import Request from "./Request";
import Response from "./Response";



const RequestComponents = () => {
  const [apiDocumentation, currentEndpoint] = useSelector(({ app }) => [app.apiDocumentation, app.currentEndpoint]),
    selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];

  return (
    <div className="info-content">
      <Row>
        <Col className="pr-8" sm={12}>
          <Parameters {...{ selectedEndpoint }} />
        </Col>
        <Col className="pl-8" sm={12}>
          <Col>
            <Request {...{ selectedEndpoint }} />
          </Col>
          <Col>
            <Response {...{ selectedEndpoint }} />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default RequestComponents;