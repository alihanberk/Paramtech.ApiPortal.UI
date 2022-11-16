import { Button, Tag, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { methodColors } from "../../../lib/contants";
import { setToken, setWarning } from "store/features/app";
import { cloneDeep } from "lodash";


const Info = () => {
  const [authCode, setAuthCode] = useState(null),
    [warning, token, currentEndpoint] = useSelector(({ app }) => [app.warning, app.token, app.currentEndpoint]),
    dispatch = useDispatch(),

    handleAuthorizeButton = e => {
      const _warning = cloneDeep(warning);
      delete _warning.tokenError
      dispatch(setWarning(_warning));
      dispatch(setToken(authCode));
    }

  return (
    <div className="space-between">
      <div>
        <Tag className="content-header-tag" color={methodColors[currentEndpoint?.method]}>{currentEndpoint?.method.toUpperCase()}</Tag>
        <label className="content-label">{currentEndpoint?.endpoint}</label>
      </div> {
        !token &&
        <div className="token-container">
          <Input onChange={e => setAuthCode(e.target.value)} className="custom-input" placeholder="Bearer Token" />
          <Button type="primary" onClick={e => handleAuthorizeButton(e)} className="button-inside-input" >Authorize</Button>
        </div>
      }
    </div>
  )
};

export default Info;