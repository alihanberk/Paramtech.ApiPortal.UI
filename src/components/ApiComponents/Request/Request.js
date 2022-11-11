import { Button, Card, Divider, Table, Tag, Row, Col, Input } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { setWarning } from "store/features/app";

const Request = () => {
  const [parameters, headers, currentEndpoint, token, warning] = useSelector(({ app }) => [app.parameters, app.headerParams, app.currentEndpoint, app.token, app.warning]),
    dispatch = useDispatch(),

    getCodeString = useCallback(() => {
      let requestParameter = `'https://test_tenantapi.e-cozum.com${currentEndpoint.endpoint}' \n \b`,
        requestHeader = "",
        codeString = "";

      if (token) {
        requestHeader += `\n \b -H 'Authorization: ${token}'`;
      };

      parameters?.map((x, i) => {
        let _parameter = "";
        if (x.name !== ""){
          _parameter = `${x.name}=${x.value}`;
          requestParameter = requestParameter.slice(0, -1) + `${i === 0 ? "?" : i === parameters.length - 1 ? "&" : ""}${_parameter}'`;
        }
        return requestParameter;
      });

      headers?.map((x, i) => {
        let _headers = "";
        if (x.name !== "") {
          _headers = `'${x.name} : ${x.value}'`;
          requestHeader += `\n \b -H ${_headers}`;
        }
        return requestHeader;
      });

      codeString = `curl ${requestParameter} -X '${currentEndpoint.method.toUpperCase()}' ${requestHeader}`;

      return codeString;
    }, [parameters, currentEndpoint, headers, token]),

    onHandleRequest = () => {
      if (!token) {
        const _warning = {...warning, ...{ tokenError: true }}
        dispatch(setWarning(_warning));
      }
    }

  return (
    <Card title="Request" className="mb-40 content-card" extra={<span className="font-bold" style={{ color: token ? "green" : "red" }} >{token ? "Authorized" : "Unauthorized"}</span>}>
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