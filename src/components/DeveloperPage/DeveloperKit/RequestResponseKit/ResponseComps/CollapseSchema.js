import { Col, Empty, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const CollapseSchema = ({ data, option }) => {
  const
    apiDocumentation = useSelector(({ app }) => app.appSlice.apiDocumentation),

    renderSchema = (_content) => {
      let array = [];
      if (_content?.items?.["$ref"]) {
        array = _content?.items?.["$ref"]?.split("/");
      }
      else if (_content?.["$ref"]) {
        array = _content?.["$ref"]?.split("/");
      }
      else {
        return <Empty description="No Response Schema" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
      }

      const
        header = array?.[array?.length - 1],
        itemArray = apiDocumentation.components.schemas[header];
      return (
        <Row gutter={[12, 12]} className="response-schema">
          <Col className="font-14 text-400 color-black" xs={24}>{header}</Col>
          <Col xs={24}>
          </Col>
        </Row>
      )
    };

  console.log(apiDocumentation);
  return (
    <Row>
      <Col xs={24}>
        {option && renderSchema(data[option]?.schema)}
      </Col>
    </Row>
  );
}

export default CollapseSchema;