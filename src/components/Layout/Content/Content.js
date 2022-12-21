import { Col, Row } from "antd";
import React from "react";

const Content = ({ list, body, children }) => {
  return (
    <Row className="pt-48 layout-container pl-40 pb-40">
      <Col sm={24}>
        {children}
      </Col>
    </Row>
  )
}

export default Content;