import { Button, Card, Divider, Table, Tag, Row, Col, Input, Form } from "antd";
import React from "react";

const SetParameters = ({ selectedEndpoint }) => (
  <div>
    <h5>Parameters</h5>
    <Divider />
    <Row className="mb-16">
      <Col className="pr-8" sm={10}>
        <Input className="custom-input" placeholder="Name" />
      </Col>
      <Col className="pl-8" sm={10}>
        <Input className="custom-input" placeholder="Value" />
      </Col>
      <Col sm={4}>
        <Button className="remove-btn">Remove</Button>
      </Col>
    </Row>
    <Button className="custom-btn">Add Parameters</Button>
  </div>
)

export default SetParameters;