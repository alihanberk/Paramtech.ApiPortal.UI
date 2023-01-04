import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { v4 } from "uuid";

const CollapseExampleValue = ({ data, option }) => {

  const documentation = useSelector(({ app }) => app.documentation),

    getContentSchema = _content => {
      let array = [];
      if (_content?.items?.["$ref"]) {
        array = _content?.items?.["$ref"]?.split("/");
      }
      else if (_content?.["$ref"]) {
        array = _content?.["$ref"]?.split("/");
      }
      else {
        return true;
      }

      const
        itemArray = documentation.data?.components.schemas[array?.[array?.length - 1]],
        returnData = {};

      for (const [key, value] of Object.entries(itemArray.properties)) {
        if (value.format)
          returnData[key] = v4();
        else if (value.items?.["$ref"])
          returnData[key] = getContentSchema(value);
        else returnData[key] = value.type;
      }
      return returnData;

    }

  return (
    <Row>
      <Col sm={24}>
        <SyntaxHighlighter className="syntax-highlighter" language="json" style={docco}>
          {option && JSON.stringify(getContentSchema(data[option]?.schema), undefined, 2)}
        </SyntaxHighlighter>
      </Col>
    </Row>
  );
}

export default CollapseExampleValue;