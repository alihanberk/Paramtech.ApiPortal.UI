
import { Card, Col, Input, Row } from "antd";
import { parameterTypes } from "lib/contants";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParameters } from "store/features/app";

const ParameterKit = () => {
  const [currentEndpoint, documentation, parameters] = useSelector(({ app }) => [app.organization.currentEndpoint, app.documentation, app.appSlice.parameters]),

    dispatch = useDispatch(),

    changeParameters = useCallback(() => {
      let _parameters = [];
      const selectedEndpoint = documentation.data.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];

      selectedEndpoint.parameters?.map(x => {
        if (!selectedEndpoint.parameters.find(y => `{${y.name}}` === x.name))
          return _parameters.push({ key: x.in + x.name, place: x.in, name: x.name, value: "", type: x.schema.type, required: !x.allowEmptyValue, formattedStyle: x.in === parameterTypes.path && `{${x.name}}` })
        return true;
      });

      dispatch(setParameters(_parameters));

    }, [currentEndpoint, documentation, dispatch]),

    handleChangeParameters = (key, value, dataKey) => {
      const
        _parameters = [...parameters],
        index = _parameters.indexOf(_parameters.find(x => x.key === key)),
        _obj = { ..._parameters[index] };

      _obj[dataKey] = value.toString();
      _parameters[index] = { ..._parameters[index], ..._obj }
      return dispatch(setParameters(_parameters))
    };

  React.useEffect(() => {
    changeParameters();
  }, [changeParameters]);

  console.log(parameters);
  return (
    <Card
      className="secondary-type"
      title="Parameters"
    >
      <Row gutter={[8, 20]}>
        {
          parameters?.map((parameter, i) => (
            <Col key={i} xs={24}>
              <Row>
                <Col xs={6}>
                  <div className="font-16 color-black text-400">
                    {parameter.name} {parameter.required && <strong>*</strong>}
                  </div>
                  <div>
                    {parameter.type} | {`{ ${parameter.place} }`}
                  </div>
                </Col>
                <Col xs={18}>
                  <Input defaultValue={parameter.value} placeholder="Value" onChange={e => handleChangeParameters(parameter.key, e.target.value, "value")} />
                </Col>
              </Row>
            </Col>
          ))
        }
      </Row>
    </Card>
  )
}

export default ParameterKit;