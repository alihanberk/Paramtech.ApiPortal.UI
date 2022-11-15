import { Button, Card, Divider, Table, Tag, Row, Col, Input, Tooltip } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { setWarning, submitRequest } from "store/features/app";
import { CopyOutlined } from '@ant-design/icons';

const Request = () => {
  const [parameters, headers, currentEndpoint, token, warning, body] = useSelector(({ app }) => [app.parameters, app.headerParams, app.currentEndpoint, app.token, app.warning, app.requestBody]),
    dispatch = useDispatch(),
    [isCopy, setCopy] = useState(false),

    getCodeString = useCallback(() => {
      let requestParameter = `'https://test_tenantapi.e-cozum.com${currentEndpoint.endpoint}'`,
        requestHeader = "    -H 'Content-Type: application/json'\n",
        codeString = "",
        requestBody = "";

      if (token) {
        requestHeader += `    -H 'Authorization: ${token}' \n`;
      };

      parameters?.map((x, i) => {
        let _parameter = "";
        if (x.name !== "") {
          _parameter = `${x.name}=${x.value}`;
          requestParameter = requestParameter.slice(0, -1) + `${i === 0 ? "?" : i === parameters.length - 1 ? "&" : ""}${_parameter}'`;
        }
        return requestParameter;
      });

      headers?.map((x, i) => {
        let _headers = "";
        if (x.name !== "") {
          _headers = `'${x.name}: ${x.value}'`;
          requestHeader += `    -H ${_headers}\n`;
        }
        return requestHeader;
      });

      if (body) {
        requestBody += `    -d '${JSON.stringify(body, undefined, 3)}' \n`
      }

      codeString = `curl -X ${currentEndpoint.method.toUpperCase()} ${requestParameter} \n${requestHeader} \n ${requestBody}`;

      return codeString;
    }, [parameters, currentEndpoint, headers, token, body]),

    getRequest = () => {
      const url = `https://test_tenantapi.e-cozum.com${currentEndpoint.endpoint}`,
        _parameters = {},
        _headers = {};

      parameters.forEach(element => {
        _parameters[element["name"]] = element["value"]
      });

      headers.forEach(element => {
        _headers[element["name"]] = element["value"]
      });

      _headers["Authorization"] = token;

      dispatch(submitRequest({ url, method: currentEndpoint.method, parameters: _parameters, headers: _headers, data: body }));
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
          <SyntaxHighlighter className="syntax-highlighter" language="bash" style={docco}>
            {getCodeString()}
          </SyntaxHighlighter>
        </Col>
      </Row>
      <Button type="primary" onClick={() => onHandleRequest()} className="custom-btn element-right">Run Request</Button>
    </Card>
  )
}

export default Request;