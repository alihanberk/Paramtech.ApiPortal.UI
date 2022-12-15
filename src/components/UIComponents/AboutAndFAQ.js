import { Col, Row } from "antd";
import React from "react";
import SummaryList from "./SummaryList";
import Typography from "./Typography";

const AboutAndFAQ = ({ data, FAQData }) => (
  <Row className="aboutAndFAQ">
    <Col sm={12}>
      {
        data.map(data => (
          <SummaryList {...{ data, type: "column", isSeenAll: false }} />
        ))
      }
    </Col>
    <Col className="full-width faq" sm={{ span: 11, offset: 1 }}>
      <Typography.Label color="#000" className="font-16 text-700">{FAQData.name}</Typography.Label>
      <Row className="mt-16 flex direction-column">
        {
          FAQData.questions?.map(faq => (
            <Col className="mb-16" key={faq.key}>
              <Typography.P color="#000" className="font-14 text-700 mb-0 line-20">{faq.name}</Typography.P>
              <Typography.P color="#000" className="font-14 text-400 mb-0 line-20">{faq.label}</Typography.P>
            </Col>
          ))
        }
      </Row>
    </Col>
  </Row>
)

export default AboutAndFAQ;