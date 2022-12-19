import { Card, List, Switch, Tag } from "antd";
import React, { useState } from "react";
import { LeftOutlined, RightOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { methodColors, pageTypes } from "lib/contants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearOrganizationState, setCurrentEndpoint, setCurrentProduct, setCurrentTag } from "store/features/organization";
import { clearData } from "store/features/app";

const reducerTypes = {
  endpoint: setCurrentEndpoint,
  organization: setCurrentProduct,
  product: setCurrentTag
};

const MenuList = ({ data }) => {
  const
    location = useLocation(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    currentTag = useSelector(({ app }) => app.organization.currentTag),
    [descriptions, showDescriptions] = useState(false),

    RenderItem = ({ item }) => (
      data?.withTag ?
        <div className="flex">
          <Tag className="text-center pl-8 pr-8 pt-4 pb-4 border-none" color={methodColors[item.method]}>{item.method}</Tag>
          <div>
            <div style={{ fontWeight: descriptions ? "bold" : "normal" }}>{item.endpoint}</div>
            {
              descriptions &&
              <label>{item.data.summary}</label>
            }
          </div>
        </div>
        :
        <span>{item[data?.field]}</span>
    ),

    Footer = () => (
      <div className="p-24 space-between color-black font-14 text-400">
        <div>
          <span>{currentTag}</span>
        </div>
        <div>
          <Switch
            checkedChildren={<EyeOutlined />}
            unCheckedChildren={<EyeInvisibleOutlined />}
          />
        </div>
      </div>
    ),

    handleListClick = (e, item) => {
      e.stopPropagation();
      console.log(item);
      if ([pageTypes.endpoint, pageTypes.product].includes(data.type)) {
        if (currentTag) {
          dispatch(reducerTypes[data.type](item))
          navigate(location.pathname + "/" + currentTag);
        }
        else {
          dispatch(reducerTypes[data.type](item.name));
          dispatch(clearData([
            { key: "headerParams", initialState: [] },
            { key: "parameters", initialState: [] },
            { key: "drawerVisible", initialState: false },
            { key: "body", initialState: null },
            { key: "responseContent", initialState: null }
          ]
          ));
        }
      }
      else {
        dispatch(reducerTypes[data.type](item.route));
        navigate(location.pathname + "/" + item.route);
      }
    },

    handleBackButton = () => {
      if (data.type === pageTypes.organization) {
        dispatch(clearOrganizationState(["currentOrganization"]));
        navigate("/home");
      }
      else {
        const locationArr = location.pathname.split("/");
        let _location = "";

        locationArr.forEach((x, i) => {
          if (i !== locationArr.length - 1 && i !== 0)
            _location += "/" + x
        });

        if (!currentTag) {
          dispatch(clearOrganizationState(["currentProduct"]))
          navigate(_location);
        }
        else {
          dispatch(clearOrganizationState(["currentTag"]))
        }
      }
    }

  return (
    <div className="menu-list-container">
      {
        data?.header &&
        <div className="flex justify-end text-400 font-12 color-black mb-8 pr-8" >{data?.header}</div>
      }
      <div className="menu-list">
        <Card title={
          <div onClick={() => handleBackButton()}>
            <LeftOutlined className="font-12" />
            <span className="ml-8 font-14 text-400 list-title">{data?.cardTitle}</span>
          </div>
        }
          className={data?.clickable ? `clickable ${data?.organizationOrProduct}` : ""}
          bordered={false}
        >
          <List
            className={`${data?.clickable && "clickable"} ${data?.className}`}
            itemLayout="horizontal"
            dataSource={data?.list}
            renderItem={item => (
              <div onClick={e => handleListClick(e, item)} key={item.key} className={`list-item ${data?.organizationOrProduct}`}>
                <List.Item className="pt-24 pb-24 ml-24 mr-24">
                  <RenderItem item={item} />
                  <RightOutlined className="font-10" />
                </List.Item>
              </div>
            )}
          />
          {
            data?.withFooter &&
            <Footer />
          }
        </Card>
      </div>
    </div >
  )
}

export default MenuList;