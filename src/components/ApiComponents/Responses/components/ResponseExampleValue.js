import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { v4 } from "uuid";

const ResponseExampleValue = ({ schemas }) => {
  const [content, apiDocumentation] = useSelector(({ app }) => [app.responseContent, app.apiDocumentation]),

    getContentSchema = _content => {
      if (_content?.items?.["$ref"]) {
        const array = _content?.items?.["$ref"]?.split("/"),
          itemArray = apiDocumentation.components.schemas[array?.[array?.length - 1]],
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
    }


  return (
    <Row>
      <Col sm={24}>
        <SyntaxHighlighter className="syntax-highlighter" language="bash" style={docco}>
          {content && JSON.stringify(getContentSchema(schemas[content]?.schema), undefined, 2)}
        </SyntaxHighlighter>
      </Col>
    </Row>
  )
}

export default ResponseExampleValue;