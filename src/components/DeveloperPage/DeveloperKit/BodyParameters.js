import { Card, Col, Empty, Row, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AceEditor from "react-ace";
import { v4 } from "uuid";
import { setRequestBody, setResponseContent } from "store/features/app";
import CardExtra from "./RequestKit/CardExtra";

const BodyParameters = () => {
  const
    [
      apiDocumentation,
      currentEndpoint,
      content,
      body
    ] = useSelector(({ app }) => [
      app.appSlice.apiDocumentation,
      app.organization.currentEndpoint,
      app.appSlice.responseContent,
      app.appSlice.requestBody
    ]),
    selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method],
    dispatch = useDispatch(),

    getContentSchema = React.useCallback(_content => {
      if (_content?.["$ref"]) {
        const array = _content?.["$ref"]?.split("/"),
          itemArray = apiDocumentation.components.schemas[array?.[array?.length - 1]],
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
    }, [apiDocumentation]),

    onBodyChange = React.useCallback(_body => {
      dispatch(setRequestBody(typeof _body === "string" ? JSON.parse(_body) : _body))
    }, [dispatch]),

    onSelectChange = (value) => {
      dispatch(setResponseContent(value))
    };

  React.useEffect(() => {
    onBodyChange(content && getContentSchema(selectedEndpoint.requestBody?.content[content].schema))
  }, [content, selectedEndpoint, getContentSchema, onBodyChange])

  return (
    <Card
      className="secondary-type"
      title="Body Parameters"
      extra={<CardExtra hasCopyButton text={JSON.stringify(body, undefined, 2)} />}
    >
      {
        selectedEndpoint?.requestBody ?
          <Row gutter={[8, 20]}>
            <Col xs={24}>
              <Select
                onChange={data => onSelectChange(data)}
                className="full-width"
                options={Object.keys(selectedEndpoint?.requestBody?.content).map(x => ({ value: x, label: x }))}
              />
            </Col>
            <Col xs={24}>
              {selectedEndpoint?.requestBody && content &&
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
                  value={JSON.stringify(body, undefined, 2)}
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