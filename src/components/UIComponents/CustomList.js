import { Button, Col, Row } from "antd";
import React from "react";
import Typography from "./Typography";
import plus from "../../assets/img/ui-icons/plus.svg";
import { ReactSVG } from "react-svg";

const CustomList = ({ data, type = "row" }) => {
  return (
    <Row className="custom-list">
      {
        data.name &&
        <Col className="mb-20" xs={24}>
          <Typography.H className={`font-${data.size || "16"} text-700 mb-${type === "row" ? "0" : "20"}`}>{data.name}</Typography.H>
        </Col>
      }
      <Col className={type === "row" ? "" : "space-between full-width"}>
        {
          data.children.map((child, index) => (
            type === "row" ?
              <Col className="mb-20" xs={24} key={index}>
                < Row >
                  <Col className="flex align-center mr-16">
                    <Button type="secondary" ><ReactSVG className="plus-svg" src={plus} /></Button>
                  </Col>
                  <Col>
                    <Row className="block line-20">
                      <Col>
                        <Typography.Label color="#000" className="text-700">{child.name}</Typography.Label>
                      </Col>
                      <Col>
                        <Typography.Label>{child.label}</Typography.Label>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col >
              :
              <Row className="column-type" key={index}>
                <Col className="mb-20" xs={24}>
                  <Row>
                    <Col xs={24} className="flex align-center mr-16 mb-8">
                      <Button type="secondary" ><ReactSVG className="plus-svg" src={plus} /></Button>
                    </Col>
                    <Col className="mb-8" xs={24}>
                      <Typography.Label color="#000" className="text-700 font-16">{child.name}</Typography.Label>
                    </Col>
                    <Col className="mb-8" xs={24}>
                      <Typography.Label color="#000" className="font-16">{child.label}</Typography.Label>
                    </Col>
                  </Row>
                </Col >
              </Row>
          ))
        }
      </Col>
    </Row >
  )
}

export default CustomList;