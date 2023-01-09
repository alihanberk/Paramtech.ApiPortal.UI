import { Dropdown, Menu } from "antd";
import React from "react";
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from "store/features/app";
import { upperCaseFirstLetter } from "lib/helpers";
import { useLocation } from "react-router-dom";
import environmentList from "../../data/environmentByOrganizations.data.json";

const BrandHeader = () => {
  const
    dispatch = useDispatch(),
    location = useLocation(),
    [
      environment,
      currentProduct,
      organizations,
      currentTag
    ] = useSelector(({ app }) => [app.appSlice.environment, app.organization.currentProduct, app.organization.currentOrganization, app.organization.currentTag]),
    organizationEnvironments = environmentList[organizations],

    handleChangeEnv = (e) => {
      if (e.key !== environment) {
        dispatch(setAppState({ key: "brandVisible", data: true }));
        dispatch(setAppState({ key: "environment", data: e.key }));
      }
    },

    menu = () => (
      <Menu onClick={handleChangeEnv}>

        {
          organizationEnvironments?.map((env, i) => (
            environment !== env &&
            <Menu.Item key={env} className={`env-item ${organizationEnvironments.length - 1 === i ? "" : "with-border"}`}>{env.toUpperCase()}</Menu.Item>
          ))
        }
      </Menu>
    ),

    getRouteString = () => {
      return `Home${organizations ? `  \xa0/\xa0 ${upperCaseFirstLetter(organizations)}` : ""}${currentProduct ? ` \xa0/\xa0 ${upperCaseFirstLetter(currentProduct)}` : ""}${currentTag?.tag ? ` \xa0/\xa0 ${upperCaseFirstLetter(currentTag?.tag)}` : ""}`
    }

  React.useEffect(() => {
    if (!environment && location.pathname.includes("organizations") && organizationEnvironments)
      dispatch(setAppState({ key: "environment", data: organizationEnvironments[0] }));
  }, [location])

  return (
    <div className="brand-header space-between layout-container">
      <div className="font-14 text-400 color-black">
        {getRouteString()}
      </div>
      {
        location.pathname.includes("organizations") && environment &&
        (
          organizationEnvironments.length === 1 ?
            <div className="dropdown auto-width space-between">
              <span>{environment.toUpperCase()}</span>
            </div>
            :
            < Dropdown
              trigger={["click"]}
              overlay={menu} >
              <div className="dropdown auto-width space-between">
                <span>{environment.toUpperCase()}</span>
                <DownOutlined />
              </div>
            </Dropdown>
        )
      }
    </div >
  )
}

export default BrandHeader;