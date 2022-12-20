import { Card, List, Switch, Tag } from "antd";
import React, { useState } from "react";
import { LeftOutlined, RightOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { methodColors, pageTypes } from "lib/contants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { clearOrganizationState, setCurrentEndpoint, setCurrentProduct, setCurrentTag } from "store/features/organization";
import { clearData } from "store/features/app";
import ListUtils from "./utils";

const reducerTypes = {
  endpoint: setCurrentEndpoint,
  organization: setCurrentProduct,
  product: setCurrentTag
};

const MenuList = ({ data }) => {

  const
    params = useParams(),
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
      ListUtils[`${data.page}Forward`]({ item, dispatch, type: data.type, page: data.page, navigate, location, options: { currentTag }, params });
    },

    handleBackButton = () => {
      ListUtils[`${data.page}Back`]({ type: data.type, dispatch, navigate, location, params });
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