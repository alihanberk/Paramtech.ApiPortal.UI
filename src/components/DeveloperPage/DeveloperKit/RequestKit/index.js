import { Button, Card, Col, Row } from "antd";
import { requestTypes } from "lib/contants";
import { getRequestPayload } from "lib/helpers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { setAppState, submitRequest } from "store/features/app";
import CardExtra from "./CardExtra";

const RequestKit = () => {
  const [
    currentEndpoint,
    token,
    requestLanguage,
    currentParameters,
    currentKey
  ] = useSelector(({ app }) => [
    app.organization.currentEndpoint,
    app.appSlice.token,
    app.appSlice.requestLanguage,
    app.currentParameters,
    app.appSlice.currentKey
  ]),

    dispatch = useDispatch(),

    getCodeString = React.useCallback(() => {
      return requestTypes.find(x => x.type === requestLanguage)?.function({ currentEndpoint, token, parameters: currentParameters[currentKey]?.parameters, body: currentParameters[currentKey]?.bodyParameters });
    }, [currentEndpoint, token, requestLanguage, currentKey, currentParameters]),

    getRequest = () => {
      const _parameters = getRequestPayload(token, currentEndpoint, currentParameters[currentKey]?.parameters, "objectQuery");

      dispatch(submitRequest({ url: _parameters.url, method: currentEndpoint.method, parameters: _parameters.parameters, headers: _parameters.headers, data: currentParameters[currentKey]?.bodyParameters }));
    },

    onHandleRequest = () => {
      if (token)
        getRequest();
      else {
        dispatch(setAppState({ key: "authorizedWarning", data: true }));
      }
    },

    codeString = getCodeString();


  return (
    <Card
      className="secondary-type"
      title="Request"
      extra={<CardExtra text={codeString} hasCopyButton hasDropdown />}
    >
      <Row>
        <Col xs={24}>
          <SyntaxHighlighter className="syntax-highlighter font-12" language={requestLanguage} style={docco}>
            {codeString.replace(/\n\s*\n/g, '\n')}
          </SyntaxHighlighter>
        </Col>
        <Col xs={24}>
          <Button type="primary" className="pt-8 pb-8 pl-16 pr-16 auto-height element-right" onClick={() => onHandleRequest()}>Run Request</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default RequestKit;