import { Button, Col, Row } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { setModelVisibility } from "store/features/app";
import { v4 } from "uuid";

const ResponseSchema = ({ schemas }) => {
  const [content, apiDocumentation, visibility] = useSelector(({ app }) => [app.responseContent, app.apiDocumentation, app.responseModelVisibility]),
    dispatch = useDispatch(),

    handleModelClick = (key, e) => {
      e.stopPropagation();
      const _visibility = cloneDeep(visibility);
      _visibility[key] = !visibility[key]
      dispatch(setModelVisibility({ ...visibility, ..._visibility }));
    },

    renderSchema = (_content, zIndex = 0) => {
      const array = _content?.items?.["$ref"]?.split("/"),
        header = array?.[array?.length - 1],
        itemArray = apiDocumentation.components.schemas[header];

      return (
        <Row>
          <Col sm={24} >
            <h4>{header}</h4>
          </Col>
          <Col sm={24} >
            {
              Object.entries(itemArray.properties).map(parent => (
                <Col className="model-card">
                  <Col className="model-card-header" sm={8}>{parent[0]}</Col>
                  <Col onClick={e => handleModelClick(parent[0], e)} className="model-card-item" sm={16}>
                    {
                      parent[1].items?.["$ref"]
                        ? <div style={{ zIndex: zIndex }} className="">{visibility[parent[0]] ? renderSchema(parent[1], zIndex + 1) : "..."}</div>
                        : Object.entries(parent[1]).map(child => (
                          <Col>{child[0]}: {child[1].toString()}</Col>
                        ))
                    }
                  </Col>
                </Col>
              ))
            }
          </Col>
        </Row>
      )
    }


  return (
    <Row>
      <Col sm={24}>
        {
          content && renderSchema(schemas[content]?.schema)
        }
      </Col>
    </Row>
  )
}

export default ResponseSchema;