import React, { useState } from "react";
import { Drawer, Menu, List, Tag, Input, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { setCurrentEndpoint } from "store/features/app";


const Sider = () => {

  const
    [currentTag, setCurrentTag] = useState(null),
    [descriptions, showDescriptions] = useState(false),
    dispatch = useDispatch(),
    apiDocumentation = useSelector(({ app }) => app.normalizedApiDocumentation),
    methodColors = {
      get: "blue",
      post: "green",
      put: "orange",
      delete: "red"
    },

    onEndpointClick = path => {
      dispatch(setCurrentEndpoint(path));
    }


  return (
    <div>
      <Input.Search placeholder="input search text" className="p-16" />
      <Menu
        mode="inline"
        items={apiDocumentation.tags?.map(item => ({ label: item, key: item }))}
        onClick={({ key }) => setCurrentTag(key)}
      />
      <Drawer
        open={!!currentTag}
        onClose={() => setCurrentTag(null)}
        placement="left"
        getContainer=".api-docs-content"
        style={{ position: "absolute" }}
        maskStyle={{ background: "rgba(0, 0, 0, 0.1)" }}
        title={<div style={{ display: "flex", justifyContent: "space-between" }}>
          {currentTag}
          <Switch
            checkedChildren={<EyeOutlined />}
            unCheckedChildren={<EyeInvisibleOutlined />}
            onChange={showDescriptions} />
        </div>}
      >
        <List
          size="small"
          dataSource={[
            { method: "get", endpoint: "Customers", description: "Müşteri listesini getirir" },
            { method: "get", endpoint: "Customers/{id}", description: "Id'si verilen müşteriyi getirir" },
            { method: "post", endpoint: "Customers", description: "Yeni bir müşteri ekler" },
            { method: "put", endpoint: "Customers", description: "Var olan müşteriyi günceller" },
            { method: "delete", endpoint: "Customers/{id}", description: "Id'ye ait müşteriyi siler" },
          ]}
          renderItem={item => (
            <List.Item className="pointer" style={{ border: "none", justifyContent: "flex-start" }} onClick={() => onEndpointClick({ endpoint: "/api/Customers", method: "post" })}>
              <Tag style={{ width: 56, textAlign: "center" }} color={methodColors[item.method]}>{item.method}</Tag>
              <div>
                <div style={{ fontWeight: descriptions ? "bold" : "normal" }}>{item.endpoint}</div>
                {
                  descriptions &&
                  <label>{item.description}</label>
                }
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}

export default Sider;