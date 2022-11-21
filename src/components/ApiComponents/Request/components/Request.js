import { Button, Card, Row, Col, Tooltip, Dropdown, Menu } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { changeRequestLanguage, setWarning, submitRequest } from "store/features/app";
import { CopyOutlined } from '@ant-design/icons';
import { getRequestPayload } from "lib/helpers";
import { requestTypes } from "lib/contants";

const Request = () => {
  const [parameters, currentEndpoint, token, warning, body, requestLanguage] = useSelector(({ app }) => [app.parameters, app.currentEndpoint, app.token, app.warning, app.requestBody, app.requestLanguage]),
    dispatch = useDispatch(),
    [isCopy, setCopy] = useState(false),

    getCodeString = useCallback(() => {
      return requestTypes.find(x => x.type === requestLanguage)?.function({ currentEndpoint, token, parameters, body });
    }, [parameters, currentEndpoint, token, body, requestLanguage]),

    getRequest = () => {
      const _parameters = getRequestPayload(token, currentEndpoint, parameters, "objectQuery");

      dispatch(submitRequest({ url: _parameters.url, method: currentEndpoint.method, parameters: _parameters.parameters, headers: _parameters.headers, data: body }));
    },

    onHandleRequest = () => {
      if (!token) {
        const _warning = { ...warning, ...{ tokenError: true } }
        dispatch(setWarning(_warning));
      }
      else getRequest();
    },

    renderCardExtra = () => (
      <div>
        <span className="font-bold" style={{ color: token ? "green" : "red" }} >{token ? "Authorized" : "Unauthorized"}</span>
        <Dropdown
          overlay={
            <Menu onClick={e => dispatch(changeRequestLanguage(e.key))}>
              <Menu.Item key="js">Javascript</Menu.Item>
              <Menu.Item key="bash">cURL</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"><span>cURL</span></Dropdown>
        <Tooltip title={isCopy ? "Copied" : "Copy"} >
          <Button
            className="ml-16"
            onClick={() => {
              navigator.clipboard.writeText(getCodeString())
              setCopy(true);
              setTimeout(() => {
                setCopy(false)
              }, 2000);
            }}>
            <CopyOutlined />
          </Button>
        </Tooltip>
      </div>
    )

  return (
    <Card title="Request" className="mb-40 content-card" extra={renderCardExtra()}>
      <Row>
        <Col sm={24}>
          <SyntaxHighlighter className="syntax-highlighter" language={requestLanguage} style={docco}>
            {getCodeString()}
          </SyntaxHighlighter>
        </Col>
      </Row>
      <Button type="primary" onClick={() => onHandleRequest()} className="custom-btn element-right">Run Request</Button>
    </Card>
  )
}

export default Request;