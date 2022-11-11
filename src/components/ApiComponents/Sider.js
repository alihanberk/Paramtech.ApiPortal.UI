import React, { useState } from "react";
import { Drawer, Menu, List, Tag, Input, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { setCurrentEndpoint, setDrawerVisible, setHeaders, setParameters } from "store/features/app";
import { methodColors } from "../../lib/contants";
import { SearchOutlined } from '@ant-design/icons';

const Sider = () => {

  const
    [currentTag, setCurrentTag] = useState(null),
    [descriptions, showDescriptions] = useState(false),
    [searchData, setSearchData] = useState(""),
    dispatch = useDispatch(),
    [apiDocumentation, visible] = useSelector(({ app }) => [app.normalizedApiDocumentation, app.drawerVisible]),
    menuItem = apiDocumentation.tags?.map(item => ({ label: item, key: item })),

    onEndpointClick = path => {
      dispatch(setCurrentEndpoint(path));
      dispatch(setHeaders([]));
      dispatch(setParameters([]));
      dispatch(setDrawerVisible(false));
    },

    onTagClick = (key, bool) => {
      dispatch(setDrawerVisible(bool));
      setCurrentTag(key);
    },

    onSearch = value => {
      setSearchData(value);
    }

  return (
    <div>
      <div className="p-16">
        <Input onChange={e => onSearch(e.target.value)} placeholder="Search Endpoint" className="search-input" suffix={<SearchOutlined />} />
      </div>
      <Menu
        className="scrollable-menu"
        mode="inline"
        items={searchData.length ? menuItem.filter(x => x.label.includes(searchData)) : menuItem}
        onClick={({ key }) => onTagClick(key, true)}
      />
      <Drawer
        open={visible}
        onClose={() => onTagClick(null, false)}
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
          dataSource={apiDocumentation.data?.[currentTag]}
          renderItem={item => (
            <List.Item className="pointer" style={{ border: "none", justifyContent: "flex-start" }} onClick={() => onEndpointClick({ endpoint: item.endpoint, method: item.method })}>
              <Tag style={{ width: 56, textAlign: "center" }} color={methodColors[item.method]}>{item.method}</Tag>
              <div>
                <div style={{ fontWeight: descriptions ? "bold" : "normal" }}>{item.endpoint}</div>
                {
                  descriptions &&
                  <label>{item.data.summary}</label>
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