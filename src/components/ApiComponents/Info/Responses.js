import { Button, Card, Col, Divider, Row, Table, Tag } from "antd";
import { statusColor } from "lib/contants";
import React, { useCallback } from "react";

const Responses = ({ selectedEndpoint }) => {
  const
    columns = [
      { title: "Kod", dataIndex: "status", key: "status" },
      { title: "Açıklama", dataIndex: "description", key: "description" },

    ],

    getData = useCallback(() => {
      const data = [];

      for (const [key, value] of Object.entries(selectedEndpoint?.responses)) {
        data.push({ status: key, description: value.description });
      }

      return data;
    }, [selectedEndpoint]),

    data = getData();

  return (
    <Card title="Response Statuses" className="content-card">
      <Row className="responses">
        <Col className="space-around response-header mb-8" sm={24}>

          <div className="response-header-item">
            <label>Kod</label>
          </div>
          <div className="response-header-item">
            <label>Açıklama</label>
          </div>
        </Col>
        {
          data.map(x => (
            <Col className="space-around mb-8" sm={24}>
              <>
                <label className="font-bold" style={{ color: statusColor[x.status] }}  >{x.status}</label>
                <label>{x.description}</label>
              </>
            </Col>
          ))
        }
      </Row>
    </Card>
  )
};

export default Responses;