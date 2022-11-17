import { Dropdown, Menu } from "antd";
import React from "react";
import GlobeIcon from "assets/img/ui-icons/globe.svg";
import ChevronDown from "assets/img/ui-icons/chevron.svg";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "store/features/app";

const LanguageSelection = () => {
  const
    language = useSelector(({ app }) => app.language),
    dispatch = useDispatch(),
    onLangChange = e => {
      dispatch(changeLanguage(e.key))
    }
  return (
    <Dropdown
      className="persist-addon lang-selector"
      overlay={
        <Menu onClick={onLangChange}>
          <Menu.Item key="tr">TR</Menu.Item>
          <Menu.Item key="en">EN</Menu.Item>
        </Menu>
      }
      trigger={["click"]}
      placement="bottomRight"
    >
      <span>
        <ReactSVG className="lang-flag" src={GlobeIcon} />
        <span className="ml-8 mr-8">{language.toUpperCase()}</span>
        <ReactSVG className="trigger-icon" src={ChevronDown} />
      </span>
    </Dropdown>
  )
}

export default LanguageSelection;