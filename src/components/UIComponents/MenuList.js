import { Card, List } from "antd";
import React from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const MenuList = ({ data }) => {
  console.log(data)
  return (
    <div className="menu-list-container">
      {
        data.header &&
        <div className="flex justify-end text-400 font-12 color-black mb-8 pr-8" >{data.header}</div>
      }
      <div className="menu-list">
        <Card title={
          <div onClick={() => data.onBack()}>
            <LeftOutlined className="font-12" />
            <span className="ml-8 font-14 text-400 list-title">{data.cardTitle}</span>
          </div>
        }
          className={data.clickable ? `clickable ${data.organizationOrProduct}` : ""}
          bordered={false}
        >
          <List
            className={`${data.clickable && "clickable"} ${data.className}`}
            itemLayout="horizontal"
            dataSource={data.list}
            renderItem={item => (
              <div onClick={e => data.onClick(e, item)} key={item.key} className={`list-item ${data.organizationOrProduct}`}>
                <List.Item className="pt-24 pb-24 ml-24 mr-24">
                  <span>{item[data.field]}</span>
                  <RightOutlined className="font-10" />
                </List.Item>
              </div>
            )}
          />
        </Card>
      </div>
    </div >
  )
}

export default MenuList;