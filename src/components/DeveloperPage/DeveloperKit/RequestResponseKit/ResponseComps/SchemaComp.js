import { Button } from "antd";
import React from "react";
import ReactOutsideClickHandler from "react-outside-click-handler";

const SchemaComp = ({ renderFunc, parentElement }) => {
  const [visible, setVisible] = React.useState(false)
  return (
    <ReactOutsideClickHandler onOutsideClick={() => setVisible(false)} >
      {
        <Button onClick={() => setVisible(true)} className={`font-12 color-black ${visible ? "opacity-0" : ""}`}>show data</Button>
      }
      <div className={`${visible ? "visible" : ""} parent-item`}>
        {renderFunc(parentElement, true)}
      </div>
    </ReactOutsideClickHandler>
  )
}

export default SchemaComp;