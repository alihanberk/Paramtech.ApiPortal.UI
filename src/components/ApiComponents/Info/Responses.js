import { Button, Card, Col, Divider, Modal, Row, Tag, Tooltip } from "antd";
import { Table } from "components/UIComponents";
import { statusColor } from "lib/contants";
import React, { useCallback } from "react";
import { CodeOutlined } from '@ant-design/icons';
import { v4 } from "uuid";
import useModal from "antd/lib/modal/useModal";


const Responses = ({ selectedEndpoint }) => {
  const
    { isOpenModal, onOpenModal, onCloseModal } = useModal(),

    handleModalButton = () => {
      onOpenModal();
    },

    columns = [
      { title: "", dataIndex: "id", key: "id", render: id => <Button onClick={() => handleModalButton(id)} className="table-btn"><Tooltip title="Show Example Value" ><CodeOutlined /></Tooltip></Button> },
      { title: "Kod", dataIndex: "status", key: "status", render: status => <span className="font-bold" style={{ color: statusColor[status] }}>{status}</span> },
      { title: "Açıklama", dataIndex: "description", key: "description" },

    ],

    getData = useCallback(() => {
      const data = [];

      for (const [key, value] of Object.entries(selectedEndpoint?.responses)) {
        data.push({ id: v4(), status: key, description: value.description });
      }

      return data;
    }, [selectedEndpoint]),

    data = getData();

  return (
    <Card title="Response Statuses" className="content-card">
      <Table {...{ data, columns }} />
      {/* <Modal open={isOpenModal} onCancel={onCloseModal()} >
        Status 200
      </Modal> */}
    </Card>
  )
};

export default Responses;