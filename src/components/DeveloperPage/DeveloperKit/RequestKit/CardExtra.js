import { Button, Dropdown, Menu, Tooltip } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRequestLanguage } from "store/features/app";
import { DownOutlined, CopyOutlined } from '@ant-design/icons';
import { requestLanguages } from "lib/contants";

const CardExtra = ({ text }) => {
  const
    dispatch = useDispatch(),
    [isCopy, setCopy] = React.useState(false),
    requestLanguage = useSelector(({app}) => app.appSlice.requestLanguage);

  return (
    <div className="flex align-center">
      <Dropdown
        className="mr-32"
        overlay={
          <Menu onClick={e => dispatch(changeRequestLanguage(e.key))}>
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
      <Tooltip title={isCopy ? "Copied" : "Copy"} >
        <Button
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(text)
            setCopy(true);
            setTimeout(() => {
              setCopy(false)
            }, 2000);
          }}>
          <CopyOutlined />
        </Button>
      </Tooltip>
    </div>
  )
}

export default CardExtra;