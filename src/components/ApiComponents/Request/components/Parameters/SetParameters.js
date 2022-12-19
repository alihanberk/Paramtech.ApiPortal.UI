import { Divider, Row, Col, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParameters } from "store/features/app";
import { v4 } from "uuid";
import { parameterTypes } from "lib/contants";


const SetParameters = () => {
  const [currentEndpoint, apiDocumentation, parameters] = useSelector(({ app }) => [app.appSlice.currentEndpoint, app.appSlice.apiDocumentation, app.appSlice.parameters]),
    dispatch = useDispatch(),

    handleChangeParameters = (key, value, dataKey) => {
      const
        _parameters = [...parameters],
        index = _parameters.indexOf(_parameters.find(x => x.key === key)),
        _obj = { ..._parameters[index] };

      _obj[dataKey] = value.toString();
      _parameters[index] = { ..._parameters[index], ..._obj }
      return dispatch(setParameters(_parameters))
    };

  useEffect(() => {
    let
      _parameters = [],
      selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];
    selectedEndpoint.parameters?.map(x => {
      if (!selectedEndpoint.parameters.find(y => `{${y.name}}` === x.name))
        return _parameters.push({ key: v4(), place: x.in, name: x.name, value: "", required: !x.allowEmptyValue, formattedStyle: x.in === parameterTypes.path && `{${x.name}}` })
      return true;
    });

    dispatch(setParameters(_parameters));

  }, [currentEndpoint, dispatch, apiDocumentation.paths])

  return (
    <div>
      <h5>Parameters</h5>
      <Divider />
      <Row className="mb-16 block">
        {
          parameters?.map(x => (
            <div className="flex mb-8" key={x.key}>
              <Col className="pr-8" sm={5}>
                <div className="parameters-name">
                  <span>{x.name} {x.required && <strong>*</strong>}</span>
                </div>
                <div className="parameters-type">
                  <span>{x.type} | {`{ ${x.place} }`}</span>
                </div>
              </Col>
              <Col className="pl-8" sm={19}>
                <Input defaultValue={x.value} className="custom-input" placeholder="Value" onChange={e => handleChangeParameters(x.key, e.target.value, "value")} />
              </Col>
            </div>
          )
          )
        }
      </Row>
      {/* <Button type="primary" onClick={() => addParameters()} className="custom-btn">Add Parameters</Button> */}
    </div>
  )
};

export default SetParameters;