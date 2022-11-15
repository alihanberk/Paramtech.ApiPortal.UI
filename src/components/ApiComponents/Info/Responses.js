import { Button, Card, Col, Divider, Modal, Row, Select, Tag, Tooltip } from "antd";
import { Table } from "components/UIComponents";
import { statusColor } from "lib/contants";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { CodeOutlined } from '@ant-design/icons';
import { v4 } from "uuid";
import { useModal } from "hooks";
import { setResponseContent } from "store/features/app";
import { useDispatch } from "react-redux";
import ResponseExampleValue from "./ResponseExampleValue";
import ResponseSchema from "./ResponseSchema";


const Responses = forwardRef(({ selectedEndpoint }, ref) => {
  const
    { isOpenModal, onOpenModal, onCloseModal } = useModal(),
    dispatch = useDispatch(),

    handleModalButton = () => {
      onOpenModal();
    },

    columns = [
      { title: "", dataIndex: "id", key: "id", render: id => <Button onClick={() => handleModalButton(id)} className="table-btn"><Tooltip title="Show Example Value" ><CodeOutlined /></Tooltip></Button> },
      { title: "Kod", dataIndex: "status", key: "status", render: status => <span className="font-bold" style={{ color: statusColor[status] }}>{status}</span> },
      { title: "Açıklama", dataIndex: "description", key: "description" }
    ],

    getData = useCallback(() => {
      const data = [];

      for (const [key, value] of Object.entries(selectedEndpoint?.responses)) {
        data.push({ id: v4(), status: key, description: value.description });
      }

      return data;
    }, [selectedEndpoint]),

    onSelectChange = (value) => {
      dispatch(setResponseContent(value))
    },

    data = getData();

  useImperativeHandle(ref, () => ({ handleModalButton }))

  return (
    <Modal
      width={1100}
      open={isOpenModal}
      onCancel={onCloseModal}
    >
      <Table {...{ data, columns }} />
      {
        selectedEndpoint.responses?.[200]?.content &&
        <>
          <Select
            onChange={data => onSelectChange(data)}
            style={{ width: 500 }}
            options={Object.keys(selectedEndpoint.responses?.[200]?.content).map(x => ({ value: x, label: x }))}
          />
          <ResponseSchema  {...{ schemas: selectedEndpoint.responses?.[200]?.content }} />
        </>
      }
    </Modal>
    // <ResponseExampleValue  {...{ schemas: selectedEndpoint.responses[200].content }} />
  )
});

export default Responses;