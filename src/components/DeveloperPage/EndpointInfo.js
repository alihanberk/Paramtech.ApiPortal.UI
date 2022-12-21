import { Button, Col, Input, Row, Tag } from "antd";
import { methodColors } from "lib/contants";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "store/features/app";

const EndpointInfo = () => {
  const
    [authCode, setAuthCode] = React.useState(null),
    currentEndpoint = useSelector(({ app }) => app.organization.currentEndpoint),
    dispatch = useDispatch(),

    handleAuthorizeButton = e => {
      e.stopPropagation();
      dispatch(setToken(authCode));
    }

  return (
    <Row>
      <Col xs={12}>
        <Tag className="border-none pl-8 pr-8 pt-8 pb-8 font-14 text-700" color={methodColors[currentEndpoint?.method]}>{currentEndpoint?.method.toUpperCase()}</Tag>
        <label className="font-14 text-500 color-black">{currentEndpoint?.endpoint}</label>
      </Col>
      <Col xs={{ span: 8, offset: 4 }}>
        <Input
          onChange={e => setAuthCode(e.target.value)}
          className="input-type-secondary input-secondary"
          placeholder="Bearer Token"
          suffix={
            <Button onClick={e => handleAuthorizeButton(e)}  type="primary">Authorize</Button>
          } />
      </Col>
    </Row>
  )
}

export default EndpointInfo;