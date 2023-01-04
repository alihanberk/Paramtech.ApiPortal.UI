import { Card, Col, Empty, Row } from "antd";
import { useModal } from "hooks";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CardExtra from "../RequestKit/CardExtra";
import ResponseCollapseContent from "./ResponseComps";

const RequesResponseKit = () => {
  const
    { isOpenModal, onOpenModal, onCloseModal } = useModal(),
    response = useSelector(({ app }) => app.appSlice.requestResponse);


  return (
    <>
      <Card
        extra={<CardExtra hasAdditionalButton additionalButtonName="Responses" additionalButtonClick={onOpenModal} />}
        className="secondary-type"
        title="Request Response"
      >
        <Row>
          <Col xs={24}>
            {
              !_.isEmpty(response) ?
                <SyntaxHighlighter className="syntax-highlighter" language="bash" style={docco}>
                  {JSON.stringify(response.data, undefined, 2)}
                </SyntaxHighlighter>
                :
                <Empty description="No Request Response" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
          </Col>
        </Row>
      </Card>
      <ResponseCollapseContent visible={isOpenModal} onCloseModal={onCloseModal} />
    </>
  )
}

export default RequesResponseKit;