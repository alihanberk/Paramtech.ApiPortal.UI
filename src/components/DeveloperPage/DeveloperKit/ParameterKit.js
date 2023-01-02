
import { Card, Col, Input, Row } from "antd";
import { parameterTypes } from "lib/contants";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentParameters } from "store/features/currentParameters";

const ParameterKit = () => {
  const
    [currentEndpoint, documentation, currentKey, currentParameters] = useSelector(({ app }) => [app.organization.currentEndpoint, app.documentation, app.appSlice.currentKey, app.currentParameters]),

    dispatch = useDispatch(),

    changeParameters = useCallback(() => {
      let _parameters = [];
      const selectedEndpoint = documentation.data.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];

      selectedEndpoint.parameters?.map(x => {
        if (!selectedEndpoint.parameters.find(y => `{${y.name}}` === x.name))
          return _parameters.push({ key: x.in + x.name, place: x.in, name: x.name, value: "", type: x.schema.type, required: !x.allowEmptyValue, formattedStyle: x.in === parameterTypes.path && `{${x.name}}` })
        return true;
      });

      dispatch(setCurrentParameters({ key: currentKey, data: { parameters: _parameters } }));

    }, [documentation, dispatch, currentKey]),

    handleChangeParameters = (key, value, dataKey) => {
      const
        _parameters = [...currentParameters?.[currentKey]?.parameters],
        index = _parameters.indexOf(_parameters.find(x => x.key === key)),
        _obj = { ..._parameters[index] };

      _obj[dataKey] = value.toString();
      _parameters[index] = { ..._parameters[index], ..._obj }
      return dispatch(setCurrentParameters({ key: currentKey, data: { parameters: _parameters } }))
    };

  React.useEffect(() => {
    if (!currentParameters[currentKey])
      changeParameters();
  }, [changeParameters, currentKey]);

  return (
    <Card
      className="secondary-type"
      title="Parameters"
    >
      <Row gutter={[8, 20]}>
        {
          currentParameters?.[currentKey]?.parameters?.map((parameter, i) => {
            return (
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
                    <Input value={parameter.value} placeholder="Value" onChange={e => handleChangeParameters(parameter.key, e.target.value, "value")} />
                  </Col>
                </Row>
              </Col>
            )
          }
          )
        }
      </Row>
    </Card>
  )
}

export default ParameterKit;