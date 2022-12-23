import { Button, Col, Input, Row, Tag } from "antd";
import { methodColors } from "lib/contants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorizedWarning, setToken } from "store/features/app";

const EndpointInfo = () => {
  const
    [authCode, setAuthCode] = React.useState(null),
    [currentEndpoint, token, warning] = useSelector(({ app }) => [app.organization.currentEndpoint, app.appSlice.token, app.appSlice.authorizedWarning]),
    dispatch = useDispatch(),

    handleAuthorizeButton = e => {
      e.stopPropagation();
      dispatch(setToken(authCode));
    }

  useEffect(() => {
    if (warning) {
      setTimeout(() => {
        dispatch(setAuthorizedWarning(false));
      }, 3000)
    }
  }, [warning, dispatch])

  return (
    <Row>
      <Col xs={12}>
        <Tag className="border-none pl-8 pr-8 pt-8 pb-8 font-14 text-700" color={methodColors[currentEndpoint?.method]}>{currentEndpoint?.method.toUpperCase()}</Tag>
        <label className="font-14 text-500 color-black">{currentEndpoint?.endpoint}</label>
      </Col>
      <Col xs={{ span: 8, offset: 4 }}>
        <Input
          disabled={token}
          onChange={e => setAuthCode(e.target.value)}
          className={`input-type-secondary p-8 input-secondary ${token ? "closeInput" : ""} ${warning ? "unauthorized" : ""} element-right auto-width`}
          placeholder="Bearer Token"
          suffix={
            <Button
              className={`${token ? "successAuthorized" : ""} ${warning ? "unauthorized shakeButton" : ""}`}
              onClick={e => token ? null : handleAuthorizeButton(e)}
              type="primary">
              {token ?
                "Authorized" :
                "Authorize"}
            </Button>
          } />
      </Col>
    </Row>
  )
}

export default EndpointInfo;