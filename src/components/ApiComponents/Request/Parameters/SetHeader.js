import { Button, Card, Divider, Table, Tag, Row, Col, Input, Form } from "antd";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeaders } from "store/features/app";
import { v4 } from "uuid";
import { DeleteOutlined } from '@ant-design/icons';


const SetHeaders = () => {
  const [headers, currentEndpoint, apiDocumentation] = useSelector(({ app }) => [app.headerParams, app.currentEndpoint, app.apiDocumentation]),
    dispatch = useDispatch(),

    addParameters = () => {
      const _headers = [...headers, { key: v4(), name: "", value: "" }]
      dispatch(setHeaders(_headers));
    },

    removeParameters = key => {
      const index = headers.indexOf(headers.find(x => x.key === key)),
        _headers = cloneDeep(headers);
      if (index !== -1) {
        _headers.splice(index, 1)
      }
      dispatch(setHeaders(_headers))
    },

    handleChangeParameters = (key, value, dataKey) => {
      const
        _headers = cloneDeep(headers),
        parameterByKey = _headers.find(x => x.key === key),
        index = headers.indexOf(headers.find(x => x.key === key));
      if (index !== -1) {
        _headers.splice(index, 1)
      }
      parameterByKey[dataKey] = value;
      _headers.push(parameterByKey);
      dispatch(setHeaders(_headers))
    };

  useEffect(() => {
    let
      _headers = [],
      _initialHeader = [{key: v4(), name: "content-type", value: "application/json", required: true}],
      selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];

    _initialHeader.map(header => {
      if(!_headers.includes(header));
      return _headers.push(header);
    })

    selectedEndpoint.parameters.map(x => {
      if (x.in === "header") {
        _headers.push({ key: v4(), name: x.name, value: x.schema.type, required: !x.allowEmptyValue })
      }
      return _headers;
    });

    _headers = [...headers, ..._headers];
    console.log(_headers, headers)
    dispatch(setHeaders(_headers));
  }, [currentEndpoint, dispatch])

  return (
    <div>
      <h5>Headers</h5>
      <Divider />
      <Row className="mb-16 block">
        {
          headers?.map(x => (
            <div className="flex mb-8" key={x.key}>
              <Col className="pr-8" sm={10}>
                <Input disabled={x.required} defaultValue={x.name} className="custom-input" placeholder="Name" onChange={e => handleChangeParameters(x.key, e.target.value, "name")} />
              </Col>
              <Col className="pl-8" sm={10}>
                <Input defaultValue={x.value} className="custom-input" placeholder="Value" onChange={e => handleChangeParameters(x.key, e.target.value, "value")} />
              </Col>
              <Col className="centered" sm={4}>
                <Button  disabled={x.required} onClick={() => removeParameters(x.key)} className="remove-btn"><DeleteOutlined /></Button>
              </Col>
            </div>
          ))
        }
      </Row>
      <Button type="primary" onClick={() => addParameters()} className="custom-btn">Add Parameters</Button>
    </div>
  )
};

export default SetHeaders;