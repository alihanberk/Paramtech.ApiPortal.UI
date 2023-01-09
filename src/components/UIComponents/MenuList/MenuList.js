import { Card, Col, List, Row, Switch, Tag } from "antd";
import React from "react";
import { LeftOutlined, RightOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { methodColors } from "lib/contants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setAppState } from "store/features/app";
import ListUtils from "./utils";
import Description from "../Description";
import Loading from "../Loading";
import { useIntl } from "react-intl";

const MenuList = ({ data }) => {
  const
    intl = useIntl(),
    params = useParams(),
    location = useLocation(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    [currentTag, descriptionVisible, loading] = useSelector(({ app }) => {
      const loading = data?.stateKey ? app[data?.stateKey]?.loading : false;
      return [app.organization.currentTag, app.appSlice.descriptionVisible, loading]
    }),

    RenderItem = ({ item }) => {
      return (
        data?.withTag ?
          <Row className="flex">
            <Col>
              <Row>
                <Col xs={6}>
                  <Tag className="text-center pl-8 pr-8 pt-4 pb-4 border-none" color={methodColors[item.method]}>{item.method}</Tag>
                </Col>
                <Col xs={18}>
                  <Description className={descriptionVisible ? "text-700" : "text-400"} limit={24} text={item.endpoint} tooltipMessage={item.endpoint} />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col xs={7}></Col>
                <Col xs={17}>
                  {
                    descriptionVisible &&
                    <label>{item.data.summary}</label>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
          :
          <span>{item[data?.field]}</span>
      )
    },

    Footer = () => (
      <div className="p-24 space-between color-black font-14 text-400 fixed-bottom">
        <div>
          <span>{currentTag?.tag}</span>
        </div>
        <div>
          <Switch
            checked={descriptionVisible}
            checkedChildren={<EyeOutlined />}
            onChange={e => dispatch(setAppState({ key: "descriptionVisible", data: e }))}
            unCheckedChildren={<EyeInvisibleOutlined />}
          />
        </div>
      </div>
    ),

    handleListClick = (e, item) => {
      e.stopPropagation();
      ListUtils[`${data.page}Forward`]({ item, dispatch, type: data.type, page: data.page, navigate, location, params });
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
          <div onClick={() => !loading && handleBackButton()}>
            <LeftOutlined className="font-12" />
            <span className="ml-8 font-14 text-400 list-title">{data?.cardTitle && intl.formatMessage({ id: data?.cardTitle })}</span>
          </div>
        }
          className={data?.clickable ? `clickable` : ""}
          bordered={false}
        >
          <Loading size="xxl" loading={loading} >
            <List
              className={`${data?.clickable && "clickable"} ${data?.className}`}
              itemLayout="horizontal"
              dataSource={data?.list}
              renderItem={item => (
                <div onClick={e => handleListClick(e, item)} key={item.key} className={`list-item`}>
                  <List.Item className="pt-24 pb-24 ml-24 mr-24">
                    <RenderItem item={item} />
                    <RightOutlined className="font-10" />
                  </List.Item>
                </div>
              )}
            />
          </Loading>
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