import { Button, Card, Row, Col } from "antd";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Responses from "../../Responses";


const Response = () => {
  const response = useSelector(({ app }) => app.requestResponse),
    responsesRef = useRef();

  return (
    <Card title="Response" className="mb-40 content-card" extra={<Button onClick={() => responsesRef.current.handleModalButton()} type="primary">Responses</Button>} >
      <Row>
        <Col sm={24}>
          <SyntaxHighlighter className="syntax-highlighter" language="bash" style={docco}>
            {JSON.stringify(response.data, undefined, 2)}
          </SyntaxHighlighter>
        </Col>
      </Row>
      <Responses
        ref={el => responsesRef.current = el}
      />
    </Card >
  )
}

export default Response;