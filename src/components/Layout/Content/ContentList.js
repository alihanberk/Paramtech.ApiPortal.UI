import { Input } from "antd";
import { MenuList } from "components/UIComponents";
import React from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import seacrhIcon from "../../../assets/img/ui-icons/search.svg";

const ContentList = () => {
  const sider = useSelector(({ app }) => app.sider.list);

  return (
    <div>
      <div className="mb-40" >
        <Input prefix={<ReactSVG className="svg-prefix" src={seacrhIcon} />} className="input-type-secondary" placeholder={sider.placeholder} />
      </div>
      <div>
        <MenuList {...{ data: sider.data, }} />
      </div>
    </div>
  )
}

export default ContentList;