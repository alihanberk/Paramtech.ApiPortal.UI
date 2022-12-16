import { Row, Col, Button } from "antd";
import { Typography } from "components/UIComponents";
import React from "react";
import { ReactSVG } from "react-svg";
import hero from "../../assets/img/hero-error.svg";

const Hero = ({ title }) => {
  return (
    <Row>
      <Col md={10}>
        <Row>
          <Col xs={24}>
            <Typography.H className="font-26 text-700 mb-0">{title}</Typography.H>
          </Col>
          <Col className="mb-32" xs={24}>
            <Typography.P className="color-light-gray font-16">Explore our guides and examples to integrate Param</Typography.P>
          </Col>
          <Col xs={24}>
            <Typography.H className="font-20 text-700 mb-16">Payment</Typography.H>
          </Col>
          <Col xs={18}>
            <Typography.P className="font-16 mb-5 color-black text-400 line-24" >Build a web or mobile integration to accept payments online or in person</Typography.P>
          </Col>
          <Col xs={24}>
            <Button type="primary" className="flex auto-height">
              <span className="font-12 pt-4 pb-4 pl-16 pr-16">Explore</span>
            </Button>
          </Col>
        </Row>
      </Col>
      <Col className="hero-svg" md={14}>
        <ReactSVG className="svg flex justify-end align-end full-height" src={hero} />
      </Col>
    </Row>
  )
}

export default Hero;