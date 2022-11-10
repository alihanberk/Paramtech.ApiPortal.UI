import { Button, Card, Divider, Table, Tag, Row, Col, Input, Form } from "antd";
import React from "react";
import SetHeaders from "./SetHeader";
import SetParameters from "./SetParameters";

const Parameters = ({ selectedEndpoint }) => (
  <Card title="Set Request Parameters" className="mb-40 content-card">
    <div>
      <Row>
        <Col className="space-between mb-40" sm={24}>
          <label></label>
          <Input className="custom-input" placeholder="Bearer Token" />
          <Button className="button-inside-input" >Authorize</Button>
        </Col>

        <Col className="mb-40" sm={24}>
          <SetParameters />
        </Col>

        <Col sm={24}>
          <SetHeaders />
        </Col>
      </Row>
    </div>
  </Card>
)

export default Parameters;