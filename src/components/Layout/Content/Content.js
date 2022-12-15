import { Col, Row } from "antd";
import React from "react";
import ContentBody from "./ContentBody";
import ContentList from "./ContentList";

const Content = ({ list, body, children }) => {
  return (
    <Row className="pt-48">
      <Col sm={5} className="pr-40" >
        <ContentList  {...list} />
      </Col>
      <Col sm={19} >
        {children}
      </Col>
    </Row>
  )
}

export default Content;