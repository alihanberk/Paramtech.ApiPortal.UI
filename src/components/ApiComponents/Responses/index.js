import { Collapse, Modal } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";
import { useModal } from "hooks";
import { setResponseContent } from "store/features/app";
import { useDispatch, useSelector } from "react-redux";
import ResponseCollapseContent from "./components/ResponseCollapseContent";

const { Panel } = Collapse;


const Responses = forwardRef((_, ref) => {
  const
    { isOpenModal, onOpenModal, onCloseModal } = useModal(),
    responses = useSelector(({ app }) => {
      const { apiDocumentation, currentEndpoint } = app;
      return apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method]?.responses
    }),
    dispatch = useDispatch(),

    handleModalButton = () => {
      onOpenModal();
    },

    onSelectChange = (value) => {
      dispatch(setResponseContent(value))
    };

  useImperativeHandle(ref, () => ({ handleModalButton }))
  console.log(responses)
  return (
    <Modal
      width={1100}
      open={isOpenModal}
      onCancel={onCloseModal}
    >
      <Collapse className="m-16" accordion>
        {
          responses && Object.keys(responses).map((status, i) => (
            <Panel header={status} key={i + 1}>
              <ResponseCollapseContent {...{ onChange: onSelectChange, contentOptions: responses[status].content }} />
            </Panel>
          ))
        }
      </Collapse>
    </Modal>
  )
});

export default Responses;