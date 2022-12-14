import { Row, Col, Input, Button } from "antd";
import { Typography } from "components/UIComponents";
import React from "react";
import { ReactSVG } from "react-svg";
import hero from "../../assets/img/hero.svg";
import seacrhIcon from "../../assets/img/ui-icons/search.svg";
import arrow from "../../assets/img/ui-icons/union.svg";

const Hero = () => {
  return (
    <Row className="hero layout-container">
      <Col className="hero-description mt-24" md={6}>
        <Row>
          <Col>
            <Typography.H className="description-header">Documentation</Typography.H>
          </Col>
          <Col>
            <Typography.P className="color-light-gray font-16 mb-24">Explore our guides and examples to integrate Param</Typography.P>
          </Col>
          <Col>
            <Input prefix={<ReactSVG className="svg-prefix" src={seacrhIcon} />} className="description-input mb-40" placeholder="Search API or endpoint" />
          </Col>
          <Col>
            <Typography.H className="font-20 text-700 mb-8">Payment</Typography.H>
          </Col>
          <Col>
            <Typography.P className="font-16 mb-5 color-black mb-24" >Build a web or mobile integration to accept payments online or in person</Typography.P>
          </Col>
          <Col>
            <Button type="primary" className="flex hero-button">
              <span className="font-16 mr-8">Explore</span>
              <ReactSVG src={arrow} />
            </Button>
          </Col>
        </Row>
      </Col>
      <Col className="hero-svg" md={18}>
        <ReactSVG src={hero} />
      </Col>
    </Row>
  )
}

export default Hero;