import { Button, Card, Col, Divider, Row, Tag, Tooltip } from "antd";
import { Table } from "components/UIComponents";
import { statusColor } from "lib/contants";
import React, { useCallback } from "react";
import { CodeOutlined } from '@ant-design/icons';


const Responses = ({ selectedEndpoint }) => {
  const
    columns = [
      { title: "", dataIndex: "id", key: "id", render: () => <Button className="table-btn"><Tooltip title="Show Example Value" ><CodeOutlined /></Tooltip></Button> },
      { title: "Kod", dataIndex: "status", key: "status", render: status => <span className="font-bold" style={{ color: statusColor[status] }}>{status}</span> },
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
      <Table {...{ data, columns }} />
    </Card>
  )
};

export default Responses;