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

    /* addParameters = () => {
      const _headers = [...headers, { key: v4(), name: "", value: "" }]
      dispatch(setHeaders(_headers));
    }, */

    /*  removeParameters = key => {
       const index = headers.indexOf(headers.find(x => x.key === key)),
         _headers = cloneDeep(headers);
       if (index !== -1) {
         _headers.splice(index, 1)
       }
       dispatch(setHeaders(_headers))
     }, */

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
      selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];

    selectedEndpoint.parameters.map(x => {
      if (x.in === "header") {
        _headers.push({ key: v4(), name: x.name, value: "", required: !x.allowEmptyValue })
      }
      return _headers;
    });

    _headers = [...headers, ..._headers];

    dispatch(setHeaders(_headers));
  }, [currentEndpoint, dispatch])

  return (
    <div>
      <h5>Parameters</h5>
      <Divider />
      <Row className="mb-16 block">
        {
          headers?.map(x => (
            <div className="flex mb-8" key={x.key}>
              <Col className="pr-8" sm={5}>
                <div className="parameters-name">
                  <span>{x.name} {!x.allowEmpty && <strong>*</strong>}</span>
                </div>
                <div className="parameters-type">
                  <span>{x.type} | {`{ ${x.place} }`}</span>
                </div>
              </Col>
              <Col className="pl-8" sm={19}>
                <Input defaultValue={x.value} className="custom-input" placeholder="Value" onChange={e => handleChangeParameters(x.key, e.target.value, "value")} />
              </Col>
            </div>
          ))
        }
      </Row>
      {/* <Button type="primary" onClick={() => addParameters()} className="custom-btn">Add Parameters</Button> */}
    </div>
  )
};

export default SetHeaders;