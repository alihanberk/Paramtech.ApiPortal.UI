import { Col, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeveloperKit from "./DeveloperKit";
import EndpointInfo from "./EndpointInfo";
import { WarningOutlined } from '@ant-design/icons';
import { getKey } from "lib/helpers";
import { setAppState } from "store/features/app";
import { Loading } from "components/UIComponents";

const DeveloperPage = () => {
  const [currentEndpoint, environment, documentation] = useSelector(({ app }) => [app.organization.currentEndpoint, app.appSlice.environment, app.documentation]),
    dispatch = useDispatch();

  React.useEffect(() => {
    if (currentEndpoint)
      dispatch(setAppState({ key: "currentKey", data: getKey(currentEndpoint?.method, environment, currentEndpoint?.endpoint) }));
  }, [currentEndpoint, dispatch]);

  return (
    <Loading size="xxxl" loading={documentation.loading}>
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
    </Loading>
  )
}

export default DeveloperPage;