import { Button, Card, Divider, Table, Tag, Row, Col, Input, Form } from "antd";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParameters } from "store/features/app";
import { v4 } from "uuid";



const SetParameters = ({ selectedEndpoint }) => {
  const [parameters, currentEndpoint, apiDocumentation] = useSelector(({ app }) => [app.parameters, app.currentEndpoint, app.apiDocumentation]),
    dispatch = useDispatch(),

    addParameters = () => {
      const _parameter = [...parameters, { key: v4(), name: "", value: "" }]
      dispatch(setParameters(_parameter));
    },

    removeParameters = key => {
      const index = parameters.indexOf(parameters.find(x => x.key === key)),
        _parameters = cloneDeep(parameters);
      if (index !== -1) {
        _parameters.splice(index, 1)
      }
      dispatch(setParameters(_parameters))
    },

    handleChangeParameters = (key, value, dataKey) => {
      const
        _parameters = cloneDeep(parameters),
        parameterByKey = _parameters.find(x => x.key === key),
        index = parameters.indexOf(parameters.find(x => x.key === key));
      if (index !== -1) {
        _parameters.splice(index, 1)
      }
      parameterByKey[dataKey] = value;
      _parameters.push(parameterByKey);
      dispatch(setParameters(_parameters))
    };

  useEffect(() => {
    let
      _parameters = [],
      selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];

    selectedEndpoint.parameters.map(x => {
      if (x.in === "query") {
        _parameters.push({ key: v4(), name: x.name, value: x.schema.type, required: !x.allowEmptyValue })
      }
      return _parameters;
    });

    _parameters = [...parameters, ..._parameters];
    dispatch(setParameters(_parameters));
  }, [currentEndpoint, dispatch])

  return (
    <div>
      <h5>Parameters</h5>
      <Divider />
      <Row className="mb-16 block">
        {
          parameters?.map(x => (
            <div className="flex mb-8" key={x.key}>
              <Col className="pr-8" sm={10}>
                <Input defaultValue={x.name} className="custom-input" placeholder="Name" onChange={e => handleChangeParameters(x.key, e.target.value, "name")} />
              </Col>
              <Col className="pl-8" sm={10}>
                <Input defaultValue={x.value} className="custom-input" placeholder="Value" onChange={e => handleChangeParameters(x.key, e.target.value, "value")} />
              </Col>
              <Col className="centered" sm={4}>
                <Button type onClick={() => removeParameters(x.key)} className="remove-btn">X</Button>
              </Col>
            </div>
          ))
        }
      </Row>
      <Button type="primary" onClick={() => addParameters()} className="custom-btn">Add Parameters</Button>
    </div>
  )
};

export default SetParameters;