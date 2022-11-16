import { Radio, Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ResponseExampleValue from "./ResponseExampleValue";
import ResponseSchema from "./ResponseSchema";

const ResponseCollapseContent = ({ onChange, contentOptions }) => {
  const
    [currentSwitch, setSwitch] = useState("value"),
    [content] = useSelector(({ app }) => [app.responseContent]);

  return (
    <div>
      <div>
        <Select
          value={content}
          onChange={data => onChange(data)}
          style={{ width: 500 }}
          options={Object.keys(contentOptions).map(x => ({ value: x, label: x }))}
        />
      </div>
      <div>
        <Radio.Group defaultValue={currentSwitch} onChange={e => setSwitch(e.target.value)}>
          <>
            <Radio.Button value={"value"}>
              Example Value
            </Radio.Button>
            <Radio.Button value={"schema"}>
              Schema
            </Radio.Button>
          </>
        </Radio.Group>
      </div>
      <div>
        {
          currentSwitch === "value" &&
          <ResponseExampleValue  {...{ schemas: contentOptions }} />
        }
        {
          currentSwitch === "schema" &&
          <ResponseSchema  {...{ schemas: contentOptions }} />
        }
      </div>
    </div>
  )
}

export default ResponseCollapseContent;