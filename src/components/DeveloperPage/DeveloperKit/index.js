import { Col, Row } from "antd";
import React from "react";
import BodyParameters from "./BodyParameters";
import ParameterKit from "./ParameterKit";
import RequestKit from "./RequestKit";
import RequesResponseKit from "./RequestResponseKit";

const DeveloperKit = () => {
  return (
    <Row gutter={[40]}>
      <Col sm={12}>
        <Row gutter={[8, 40]}>
          <Col xs={24}>
            <ParameterKit />
          </Col>
          <Col xs={24}>
            <BodyParameters />
          </Col>
        </Row>
      </Col>
      <Col sm={12}>
        <Row gutter={[8, 40]}>
          <Col xs={24}>
            <RequestKit />
          </Col>
          <Col xs={24}>
            <RequesResponseKit />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default DeveloperKit;