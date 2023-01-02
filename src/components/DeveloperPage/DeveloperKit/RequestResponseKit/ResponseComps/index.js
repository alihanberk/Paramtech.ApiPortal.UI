import { Button, Col, Modal, Row } from "antd";
import React from "react";
import { CloseOutlined } from '@ant-design/icons';
import CollapseContent from "./CollapseContent";

const ResponseCollapseContent = ({ visible, onCloseModal }) => {

  return (
    <div className="modall">

      <Modal
        width={648}
        open={visible}
        footer={false}
        closable={false}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} className="space-between">
            <div className="text-700 color-black">Responses</div>
            <Button onClick={() => onCloseModal()} className="modal-close-btn">Close <CloseOutlined /></Button>
          </Col>
          <Col xs={24}>
            <CollapseContent />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default ResponseCollapseContent;