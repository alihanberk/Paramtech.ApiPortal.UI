import { Card, Col, Empty, Row, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AceEditor from "react-ace";
import { v4 } from "uuid";
import CardExtra from "./RequestKit/CardExtra";
import { setCurrentParameters } from "store/features/currentParameters";

const BodyParameters = () => {
  const
    [
      documentation,
      currentEndpoint,
      currentParameters,
      currentKey
    ] = useSelector(({ app }) => [
      app.documentation,
      app.organization.currentEndpoint,
      app.currentParameters,
      app.appSlice.currentKey
    ]),
    selectedEndpoint = documentation.data.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method],
    dispatch = useDispatch(),

    getContentSchema = React.useCallback(_content => {
      if (_content?.["$ref"]) {
        const array = _content?.["$ref"]?.split("/"),
          itemArray = documentation.data.components.schemas[array?.[array?.length - 1]],
          returnData = {};
        for (const [key, value] of Object.entries(itemArray.properties)) {
          if (value.format)
            returnData[key] = v4();
          else if (value?.["$ref"])
            returnData[key] = getContentSchema(value);
          else returnData[key] = value.type;
        }
        return returnData;
      }
    }, [documentation]),

    onBodyChange = React.useCallback(_body => {
      dispatch(setCurrentParameters({ key: currentKey, data: { bodyParameters: typeof _body === "string" ? JSON.parse(_body) : _body } }))
    }, [dispatch, currentKey]),

    onSelectChange = (value) => {
      dispatch(setCurrentParameters({ key: currentKey, data: { bodyParametersKey: value } }))
    };

  React.useEffect(() => {
    const bodyParametersKey = currentParameters?.[currentKey]?.bodyParametersKey;
    if (bodyParametersKey)
      onBodyChange(getContentSchema(selectedEndpoint.requestBody?.content[bodyParametersKey].schema))
  }, [currentParameters?.[currentKey]?.bodyParametersKey, selectedEndpoint, getContentSchema, onBodyChange, currentKey]);

  return (
    <Card
      className="secondary-type"
      title="Body Parameters"
      extra={<CardExtra hasCopyButton={selectedEndpoint?.requestBody} text={JSON.stringify(currentParameters?.[currentKey]?.bodyParameters, undefined, 2)} />}
    >
      {
        selectedEndpoint?.requestBody ?
          <Row gutter={[8, 20]}>
            <Col xs={24}>
              <Select
                value={currentParameters?.[currentKey]?.bodyParametersKey}
                onChange={data => onSelectChange(data)}
                className="full-width"
                options={Object.keys(selectedEndpoint?.requestBody?.content).map(x => ({ value: x, label: x }))}
              />
            </Col>
            <Col xs={24}>
              {selectedEndpoint?.requestBody && currentParameters?.[currentKey]?.bodyParametersKey &&
                <AceEditor
                  mode="javascript"
                  theme="github"
                  name="UNIQUE_ID_OF_DIV"
                  width="100%"
                  editorProps={{ $blockScrolling: true }}
                  showGutter={true}
                  highlightActiveLine={true}
                  wrapEnabled={true}
                  setOptions={{ enableLiveAutocompletion: true }}
                  value={JSON.stringify(currentParameters?.[currentKey]?.bodyParameters, undefined, 2)}
                  onChange={e => onBodyChange(e)}
                />
              }
            </Col>
          </Row>
          :
          <Empty description="No Body Parameters" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </Card>
  )
}

export default BodyParameters;