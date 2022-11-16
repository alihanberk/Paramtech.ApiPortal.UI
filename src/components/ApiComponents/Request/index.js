import { Row, Col, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResponseContent } from "store/features/app";
import Editor from "../Documentation";
import Parameters from "./components/Parameters";
import Request from "./components/Request";
import Response from "./components/Response";


const RequestComponents = () => {
  const [apiDocumentation, currentEndpoint] = useSelector(({ app }) => [app.apiDocumentation, app.currentEndpoint]),
    selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method],
    dispatch = useDispatch(),

    onSelectChange = (value) => {
      dispatch(setResponseContent(value))
    };

  return (
    <div className="info-content">
      <Row>
        <Col className="pr-8" sm={12}>
          <Parameters {...{ selectedEndpoint }} />
          {
            selectedEndpoint?.requestBody && 
            <>
              < Select
                onChange={data => onSelectChange(data)}
                style={{ width: 500 }}
                options={Object.keys(selectedEndpoint.requestBody?.content).map(x => ({ value: x, label: x }))}
              />
              <Editor />
            </>
          }
        </Col>
        <Col className="pl-8" sm={12}>
          <Col>
            <Request />
          </Col>
          <Col>
            <Response />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default RequestComponents;