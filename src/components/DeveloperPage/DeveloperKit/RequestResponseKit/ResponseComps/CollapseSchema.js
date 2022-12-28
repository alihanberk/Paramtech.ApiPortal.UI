import { Button, Col, Empty, Row } from "antd";
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "react-redux";
import SchemaComp from "./SchemaComp";

const CollapseSchema = ({ data, option }) => {
  const
    documentation = useSelector(({ app }) => app.documentation),
    [visible, setVisible] = React.useState(false),

    renderSchema = (_content, isChild) => {
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
        itemArray = documentation.data.components.schemas[header];
      console.log(itemArray)
      return (
        <Row gutter={[12, 12]} className={`${isChild ? "p-24" : "response-schema"}`}>
          <Col className="font-14 text-600 color-black" xs={24}>{header}</Col>
          <Col xs={24}>
            <Row gutter={[16, 16]} className="collapse-schema-model">
              {
                itemArray.properties && Object.entries(itemArray.properties).map(parent => (
                  <Col xs={24} className="space-between p-8 model-item">
                    <Col xs={16} className="font-14 color-black text-500">{parent[0]}:</Col>
                    <Col xs={8} >
                      {
                        parent[1].items?.["$ref"] || parent[1]?.["$ref"] ?
                          <SchemaComp {...{ renderFunc: renderSchema, parentElement: parent[1] }} />
                          : Object.entries(parent[1]).map(child => (
                            <div>{child[0]}: {child[1].toString()}</div>
                          ))
                      }
                    </Col>
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>
      )
    };

  return (
    <Row>
      <Col xs={24}>
        {option && renderSchema(data[option]?.schema)}
      </Col>
    </Row>
  );
}

export default CollapseSchema;