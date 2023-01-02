import { Col, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeveloperKit from "./DeveloperKit";
import EndpointInfo from "./EndpointInfo";
import { WarningOutlined } from '@ant-design/icons';
import { getKey } from "lib/helpers";
import { setAppState } from "store/features/app";

const DeveloperPage = () => {
  const [currentEndpoint, environment] = useSelector(({ app }) => [app.organization.currentEndpoint, app.appSlice.environment]),
    dispatch = useDispatch();

  React.useEffect(() => {
    if (currentEndpoint)
      dispatch(setAppState({ key: "currentKey", data: getKey(currentEndpoint?.method, environment, currentEndpoint?.endpoint) }));
  }, [currentEndpoint, dispatch]);

  return (
    <>
      {
        currentEndpoint ?
          <Row className="developer-page">
            <Col className="endpoint-info mb-40" xs={24}>
              <EndpointInfo />
            </Col>
            <Col xs={24}>
              <DeveloperKit />
            </Col>
          </Row>
          :
          <div className="empty-endpoint">
            <WarningOutlined />
            <div>Lütfen bir seçim yapınız</div>
          </div>
      }
    </>
  )
}

export default DeveloperPage;