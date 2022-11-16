import { Collapse, Modal } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";
import { useModal } from "hooks";
import { setResponseContent } from "store/features/app";
import { useDispatch } from "react-redux";
import ResponseCollapseContent from "./components/ResponseCollapseContent";

const { Panel } = Collapse;


const Responses = forwardRef(({ selectedEndpoint }, ref) => {
  const
    { isOpenModal, onOpenModal, onCloseModal } = useModal(),
    dispatch = useDispatch(),

    handleModalButton = () => {
      onOpenModal();
    },

    onSelectChange = (value) => {
      dispatch(setResponseContent(value))
    };

  useImperativeHandle(ref, () => ({ handleModalButton }))

  return (
    <Modal
      width={1100}
      open={isOpenModal}
      onCancel={onCloseModal}
    >
      <Collapse className="m-16" accordion>
        {
          selectedEndpoint?.responses && Object.keys(selectedEndpoint.responses).map((status, i) => (
            <Panel header={status} key={i + 1}>
              <ResponseCollapseContent {...{ onChange: onSelectChange, contentOptions: selectedEndpoint.responses[status].content }} />
            </Panel>
          ))
        }
      </Collapse>
    </Modal>
  )
});

export default Responses;