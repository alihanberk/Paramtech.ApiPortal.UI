import { Button, Card, Divider, Table, Tag, Row, Col, Input } from "antd";
import React from "react";

const Parameters = ({ selectedEndpoint }) => {
  const
    columns = [
      { title: "İsim", dataIndex: "name", key: "name" },
      { title: "Tip", dataIndex: "type", key: "type" },
      { title: "Gönderilme Bölgesi", dataIndex: "place", key: "place" },
      { title: "Zorunluluk", dataIndex: "isRequired", key: "isRequired" }
    ],
    data = selectedEndpoint?.parameters.map(x => ({ key: Math.random(), name: x.name, allowEmpty: x.allowEmptyValue, place: x.in, type: x.schema.type, description: x.name }));

  return (
    <Card title="Parameters" className="mb-40 content-card">
      <div>
        <Row>
          {
            data.map(x => (
              <Col className="flex parameters mb-16" key={x.key} sm={24}>
                <Col sm={5}>
                  <div className="parameters-name">
                    <span>{x.name} {!x.allowEmpty && <strong>*</strong>}</span>
                  </div>
                  <div className="parameters-type">
                    <span>{x.type} | {`{ ${x.place} }`}</span>
                  </div>
                </Col>
                <Col sm={19}>
                  <Input disabled className="parameters-input" placeholder={x.description} />
                </Col>
              </Col>
            ))
          }
        </Row>
      </div>
    </Card>
  )
};

export default Parameters;