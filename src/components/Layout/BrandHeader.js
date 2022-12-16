import { Dropdown, Menu } from "antd";
import React from "react";
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { setEnvironment } from "store/features/app";

const BrandHeader = () => {
  const
    dispatch = useDispatch(),
    handleChangeEnv = (e) => {
      dispatch(setEnvironment(e.key));
    },

    menu = () => (
      <Menu onClick={handleChangeEnv}>
        <Menu.Item key="prod" className="env-item with-border">PROD</Menu.Item>
        <Menu.Item key="uat" className="env-item with-border">UAT</Menu.Item>
        <Menu.Item key="test" className="env-item with-border">TEST</Menu.Item>
        <Menu.Item key="dev" className="env-item">DEV</Menu.Item>
      </Menu>
    ),
    environment = useSelector(({ app }) => app.appSlice.environment);

  return (
    <div className="brand-header space-between layout-container">
      <div>
        Home
      </div>
      <Dropdown
        trigger={["click"]}
        overlay={menu}>
        <div className="dropdown space-between">
          <span>{environment.toUpperCase()}</span>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default BrandHeader;