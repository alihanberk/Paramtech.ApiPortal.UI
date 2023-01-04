import { Button, Col, Input, Row, Tag } from "antd";
import { methodColors } from "lib/contants";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from "store/features/app";

const EndpointInfo = () => {
  const
    [authCode, setAuthCode] = React.useState(null),
    [currentEndpoint, token, warning] = useSelector(({ app }) => [app.organization.currentEndpoint, app.appSlice.token, app.appSlice.authorizedWarning]),
    dispatch = useDispatch(),

    handleAuthorizeButton = e => {
      e.stopPropagation();
      dispatch(setAppState({ key: "token", data: { ...token, ...{ key: authCode } } }));
    }

  React.useEffect(() => {
    if (warning) {
      setTimeout(() => {
        dispatch(setAppState({ key: "authorizedWarning", data: false }));
      }, 3000);
    }
  }, [warning, dispatch]);

  React.useEffect(() => {
    if (token.key && token.runAnimation)
    setTimeout(() => {
      dispatch(setAppState({ key: "token", data: { ...token, ...{ runAnimation: false } } }))
    }, 1000);
  }, [token, dispatch])
  return (
    <Row>
      <Col xs={12}>
        <Tag className="border-none pl-8 pr-8 pt-8 pb-8 font-14 text-700" color={methodColors[currentEndpoint?.method]}>{currentEndpoint?.method.toUpperCase()}</Tag>
        <label className="font-14 text-500 color-black">{currentEndpoint?.endpoint}</label>
      </Col>
      <Col xs={{ span: 8, offset: 4 }}>
        <Input
          disabled={token.key}
          onChange={e => setAuthCode(e.target.value)}
          className={`input-type-secondary p-8 input-secondary ${token.key ? `${token.runAnimation && "runAnimation"} closeInput` : ""} ${warning ? "unauthorized" : ""} element-right auto-width`}
          placeholder="Bearer Token"
          suffix={
            <Button
              className={`${token.key ? "successAuthorized" : ""} ${warning ? "unauthorized shakeButton" : ""}`}
              onClick={e => token.key ? null : handleAuthorizeButton(e)}
              type="primary">
              {token.key ?
                "Authorized" :
                "Authorize"}
            </Button>
          } />
      </Col>
    </Row>
  )
}

export default EndpointInfo;