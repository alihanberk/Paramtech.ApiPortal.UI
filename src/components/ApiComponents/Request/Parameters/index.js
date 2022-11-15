import { Button, Card, Divider, Table, Tag, Row, Col, Input, Form, Popover } from "antd";
import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setWarning } from "store/features/app";

import SetHeaders from "./SetHeader";
import SetParameters from "./SetParameters";


const Parameters = () => {
  const [authCode, setAuthCode] = useState(null),
    warning = useSelector(({ app }) => app.warning),
    dispatch = useDispatch(),

    handleAuthorizeButton = e => {
      const _warning = cloneDeep(warning);
      delete _warning.tokenError
      dispatch(setWarning(_warning));
      dispatch(setToken(authCode));
    }

  return (
    <div className="m-40 content-card">
      <Row>
        {/* <Col className="mb-40" sm={24}>
            <Col className="space-between" sm={24}>
              <Popover
                trigger="click"
                className="full-width"
                content="You must be authorized"
                open={warning.tokenError}
              >
                <Input onChange={e => setAuthCode(e.target.value)} className="custom-input" placeholder="Bearer Token" />
                <Button type="primary" onClick={e => handleAuthorizeButton(e)} className="button-inside-input" >Authorize</Button>
              </Popover>
            </Col>
          </Col> */}
        {/* 
          <Col className="mb-40" sm={24}>
            <SetParameters />
          </Col> */}

        <Col sm={24}>
          <SetHeaders />
        </Col>
      </Row>
    </div>

  )
}

export default Parameters;