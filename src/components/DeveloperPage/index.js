import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import DeveloperKit from "./DeveloperKit";
import EndpointInfo from "./EndpointInfo";
import { WarningOutlined } from '@ant-design/icons';

const DeveloperPage = () => {
  const currentEndpoint = useSelector(({ app }) => app.organization.currentEndpoint);

  return (
    <>
      {
        currentEndpoint ?
          <Row className="developer-page">
            <Col className="endpoint-info mb-40" xs={24}>
              <EndpointInfo />
            </Col>
            <Col xs={24}>
              <DeveloperKit />
            </Col>
          </Row>
          :
          <div className="empty-endpoint">
            <WarningOutlined />
            <div>Lütfen bir seçim yapınız</div>
          </div>
    }
    </>
  )
}

export default DeveloperPage;