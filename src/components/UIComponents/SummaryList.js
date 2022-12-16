import { Col, Row } from "antd";
import React from "react";
import CustomList from "./CustomList";
import Typography from "./Typography";

const SummaryList = ({ data, type, isSeenAll = true }) => {
  return (
    <Row className="summary-list mb-48">
        <Col xs={24} className="flex align-center justify-start">
        {
          data.name &&
          <Typography.H className="font-32 text-600 mr-24" >{data.name}</Typography.H>
        }
        {
          isSeenAll &&
          <Typography.Label color={data.color} >See All</Typography.Label>
        }
      </Col>
      <Col xs={24}>
        <Row className="list-grid">
          {
            data.children?.map(child => (
              <Col>
                <CustomList {...{ data: child, type }} />
              </Col>
            ))
          }
        </Row>
      </Col>
    </Row>
  )
}

export default SummaryList;