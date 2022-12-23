import { Col, Collapse, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import arrow from "../../../../../assets/img/ui-icons/down-arrow.svg";
import CollapseBody from "./CollapseBody";

const { Panel } = Collapse;

const CollapseContent = () => {
  const responses = useSelector(({ app }) => {
    const
      { apiDocumentation } = app.appSlice,
      { currentEndpoint } = app.organization;
    return apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method]?.responses;
  }),

    RenderHeader = ({ status }) => (
      <Row>
        <Col className="flex" xs={18}>
          <div className="text-400 font-12 color-black response-status">Code: {status}</div>
          <div className="response-description font-12">{responses[status].description}</div>
        </Col>
        <Col className="flex align-center justify-end response-collapse-arrow" xs={6}>
          <img src={arrow} alt="" className="element-right" />
        </Col>
      </Row>
    );

  return (
    <Row className="response-collapse">
      {
        responses && Object.keys(responses).map((status, i) => (
          <Col key={i} xs={24}>
            <Collapse accordion>
              <Panel showArrow={false} header={<RenderHeader status={status} />}>
                <CollapseBody />
              </Panel>
            </Collapse>
          </Col>
        ))
      }
    </Row>
  )
}

export default CollapseContent;