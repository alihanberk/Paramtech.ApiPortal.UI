import { Input } from "antd";
import { MenuList } from "components/UIComponents";
import React from "react";
import { ReactSVG } from "react-svg";
import seacrhIcon from "../../../assets/img/ui-icons/search.svg";

const ContentList = ({ inputPlaceHolder, inputClassName, menuListData }) => {
  return (
    <div>
      <div className="mb-40" >
        <Input prefix={<ReactSVG className="svg-prefix" src={seacrhIcon} />} className={`${inputClassName}`} placeholder={inputPlaceHolder} />
      </div>
      <div>
        <MenuList {...{ data: menuListData, }} />
      </div>
    </div>
  )
}

export default ContentList;