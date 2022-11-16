import { Button, Card, Row, Col, Tooltip } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { setWarning, submitRequest } from "store/features/app";
import { CopyOutlined } from '@ant-design/icons';
import { bindParameters, endpointManipulation } from "lib/helpers";
import { parameterTypes } from "lib/contants";

const Request = () => {
  const [parameters, currentEndpoint, token, warning, body] = useSelector(({ app }) => [app.parameters, app.currentEndpoint, app.token, app.warning, app.requestBody]),
    dispatch = useDispatch(),
    [isCopy, setCopy] = useState(false),

    groupingParameter = _parameters => {
      let data = {};

      Object.keys(parameterTypes).forEach(key => {
        if (_parameters.filter(x => x.place === key).length)
          data[key] = _parameters.filter(x => x.place === key)
      })
      return data;
    },

    getCodeString = useCallback(() => {
      let
        endpoint = currentEndpoint.endpoint,
        url = "https://test_tenantapi.e-cozum.com",
        requestParameter = "",
        requestHeader = "    -H 'Content-Type: application/json'\n",
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
        else if (key === "path")
          return endpoint = bindParameters(groupedData[key], key, endpoint)

        return true;
      })

      return `curl -X ${currentEndpoint.method.toUpperCase()} '${url}${endpoint}${requestParameter}' \n${requestHeader} \n ${requestBody}`;
    }, [parameters, currentEndpoint, token, body]),


    getRequest = () => {
      const
        _parameters = { headers: [], parameters: [], path: currentEndpoint.endpoint };

      parameters.forEach(element => {
        if (element.place === parameterTypes.query)
          _parameters.parameters[element["name"]] = element["value"];
        else if (element.place === parameterTypes.header)
          _parameters.headers[element["name"]] = element["value"];
        else if (element.place === parameterTypes.path)
          _parameters.path = endpointManipulation(_parameters.path, element["value"]);
      });

      _parameters.headers["Authorization"] = token;

      const url = `https://test_tenantapi.e-cozum.com${_parameters.path}`;

      dispatch(submitRequest({ url, method: currentEndpoint.method, parameters: _parameters.parameters, headers: _parameters.headers, data: body }));
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