import { Button, Card, Divider, Table, Tag, Row, Col, Input, Tooltip } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { setWarning, submitRequest } from "store/features/app";
import { CopyOutlined } from '@ant-design/icons';
import { bindParameters } from "lib/helpers";
import { parameterTypes } from "lib/contants";

const Request = () => {
  const [parameters, headers, currentEndpoint, token, warning, body] = useSelector(({ app }) => [app.parameters, app.headerParams, app.currentEndpoint, app.token, app.warning, app.requestBody]),
    dispatch = useDispatch(),
    [isCopy, setCopy] = useState(false),

    groupingParameter = _parameters => {
      let data = {};

      Object.keys(parameterTypes).forEach(key => {
        if (_parameters.filter(x => x.place === key).length)
          data[key] = _parameters.filter(x => x.place === key)
      })
      console.log(data)
      return data;
    },

    getCodeString = useCallback(() => {
      let requestParameter = `'https://test_tenantapi.e-cozum.com${currentEndpoint.endpoint}'`,
        requestHeader = "    -H 'Content-Type: application/json'\n",
        codeString = "",
        requestBody = "",
        groupedData = groupingParameter(parameters);

      if (token) {
        requestHeader += `    -H 'Authorization: ${token}' \n`;
      };
      if (body) {
        requestBody += `    -d '${JSON.stringify(body, undefined, 3)}' \n`
      }

      Object.keys(groupedData)?.map(key => {
        if (key === "header")
          return requestHeader += bindParameters(groupedData[key], key)
        else if (key === "query")
          return requestParameter = bindParameters(groupedData[key], key, requestParameter)

        return true;
      })

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



  console.log(parameters)
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