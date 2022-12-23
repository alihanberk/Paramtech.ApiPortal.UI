import { Col, Empty, Row, Select } from "antd";
import Loader from "components/Loader";
import { CustomSwitch } from "components/UIComponents";
import { responseModalDetailType } from "lib/contants";
import React from "react";
import { useSelector } from "react-redux";

const
  CollapseExampleValue = React.lazy(() => import("./CollapseExampleValue")),
  CollapseSchema = React.lazy(() => import("./CollapseSchema"));

const CollapseBody = () => {
  const
    [data, setData] = React.useState(),
    [activeSwitch, setActiveSwitch] = React.useState("Example Value"),

    [
      apiDocumentation,
      currentEndpoint
    ] = useSelector(({ app }) => [
      app.appSlice.apiDocumentation,
      app.organization.currentEndpoint
    ]),

    selectedEndpoint = apiDocumentation.paths?.[currentEndpoint?.endpoint]?.[currentEndpoint?.method];


  console.log(activeSwitch);
  return (
    selectedEndpoint?.requestBody ?
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <Select
            value={data}
            onChange={data => setData(data)}
            className="full-width"
            options={Object.keys(selectedEndpoint?.requestBody?.content).map(x => ({ value: x, label: x }))}
          />
        </Col>
        <Col xs={24}>
          <CustomSwitch className="element-right" textOne="Example Value" textTwo="Schema" activeKey={activeSwitch} setActiveKey={setActiveSwitch} />
        </Col>
        <Col xs={24}>
          <React.Suspense fallback={<Loader />} >
            {
              activeSwitch === responseModalDetailType.exampleValue && <CollapseExampleValue {...{ data: selectedEndpoint?.requestBody?.content, option: data }} />
            }
            {
              activeSwitch === responseModalDetailType.schema && <CollapseSchema />
            }
          </React.Suspense>
        </Col>
      </Row>
      : <Empty description="No Response Detail" image={Empty.PRESENTED_IMAGE_SIMPLE} />
  )
}

export default CollapseBody;