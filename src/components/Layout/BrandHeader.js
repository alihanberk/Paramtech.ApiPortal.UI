import { Dropdown, Menu } from "antd";
import React from "react";
import { DownOutlined } from '@ant-design/icons';

const BrandHeader = () => {
  const menu = () => (
    <Menu>
      <Menu.Item className="env-item with-border">PROD</Menu.Item>
      <Menu.Item className="env-item with-border">UAT</Menu.Item>
      <Menu.Item className="env-item with-border">TEST</Menu.Item>
      <Menu.Item className="env-item">DEV</Menu.Item>
    </Menu>
  );

  return (
    <div className="brand-header space-between layout-container">
      <div>
        Home
      </div>
      <Dropdown
        trigger={["click"]}
        overlay={menu}>
        <div className="dropdown space-between">
          <span>PROD</span>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default BrandHeader;