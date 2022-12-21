import { Card, Col, Empty, Row } from "antd";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const RequesResponseKit = () => {
  const
    response = useSelector(({ app }) => app.appSlice.requestResponse),
    responsesRef = React.useRef();


  return (
    <Card
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
  )
}

export default RequesResponseKit;