import { Row, Col } from "antd";
import React from "react";

import SetParameters from "./SetParameters";

const Parameters = () => {

  return (
    <div className="m-40 content-card">
      <Row>
        <Col sm={24}>
          <SetParameters />
        </Col>
      </Row>
    </div>

  )
}

export default Parameters;