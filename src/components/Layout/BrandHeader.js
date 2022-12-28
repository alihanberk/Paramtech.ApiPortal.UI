import { Dropdown, Menu } from "antd";
import React from "react";
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { setBrandVisible, setEnvironment } from "store/features/app";
import { upperCaseFirstLetter } from "lib/helpers";

const BrandHeader = () => {
  const
    dispatch = useDispatch(),
    [environment, currentProduct, organizations, currentTag] = useSelector(({ app }) => [app.appSlice.environment, app.organization.currentProduct, app.organization.currentOrganization, app.organization.currentTag]),

    handleChangeEnv = (e) => {
      if (e.key !== environment) {
        dispatch(setBrandVisible(true));
        dispatch(setEnvironment(e.key));
      }
    },

    menu = () => (
      <Menu onClick={handleChangeEnv}>
        <Menu.Item key="prod" className="env-item with-border">PROD</Menu.Item>
        <Menu.Item key="uat" className="env-item with-border">UAT</Menu.Item>
        <Menu.Item key="test" className="env-item with-border">TEST</Menu.Item>
        <Menu.Item key="dev" className="env-item">DEV</Menu.Item>
      </Menu>
    ),

    getRouteString = () => {
      return `Home${organizations ? `  \xa0/\xa0 ${upperCaseFirstLetter(organizations)}` : ""}${currentProduct ? ` \xa0/\xa0 ${upperCaseFirstLetter(currentProduct)}` : ""}${currentTag ? ` \xa0/\xa0 ${upperCaseFirstLetter(currentTag)}` : ""}`
    }

  return (
    <div className="brand-header space-between layout-container">
      <div className="font-14 text-400 color-black">
        {getRouteString()}
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