import { Divider, Row, Col } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Info from "./Info";
import Parameters from "./Parameters";
import Responses from "./Responses";


const InfoComponents = () => {
  const [apiDocumentation, currentEndpoint] = useSelector(({ app }) => [app.apiDocumentation, app.currentEndpoint]),
    selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];

  return (
    <div className="info-content">
      <Info {...{ currentEndpoint }} />
      <Divider />
      {/*       <Row>
        <Col className="flex" sm={24}>
          <Col className="pr-8 full-height" sm={12}>
            <Parameters {...{ selectedEndpoint }} />
          </Col>
          <Col className="pl-8 full-height" sm={12}>
            <Responses {...{ selectedEndpoint }} />
          </Col>
        </Col>
      </Row> */}
    </div>
  );
};

export default InfoComponents;