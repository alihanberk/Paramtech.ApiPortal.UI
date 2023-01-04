import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from "store/features/app";
import { DownOutlined } from '@ant-design/icons';
import { requestLanguages } from "lib/contants";
import { CopyButton } from "components/UIComponents";

const CardExtra = ({ text, hasDropdown, hasCopyButton, hasAdditionalButton, additionalButtonName, additionalButtonClick }) => {
  const
    dispatch = useDispatch(),
    requestLanguage = useSelector(({ app }) => app.appSlice.requestLanguage);

  return (
    <div className="flex align-center">
      {
        hasDropdown &&
        <Dropdown
          className="mr-32 card-extra"
          overlay={
            <Menu onClick={e => dispatch(setAppState({ key: "requestLanguage", data: e.key }))}>
              <Menu.Item className="env-item with-border" key="js">{requestLanguages.js}</Menu.Item>
              <Menu.Item className="env-item" key="bash">{requestLanguages.bash}</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight">
          <div className="dropdown space-between auto-width">
            <span className="mr-8">{requestLanguages[requestLanguage]}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      }
      {
        hasCopyButton &&
        <CopyButton text={text} />
      }
      {
        hasAdditionalButton && additionalButtonClick && additionalButtonName &&
        <Button type="primary" onClick={additionalButtonClick}>
          {additionalButtonName}
        </Button>
      }
    </div>
  )
}

export default CardExtra;