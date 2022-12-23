import { Button, Tooltip } from "antd";
import React from "react";
import copyImg from "../../assets/img/ui-icons/copy.svg";

const CopyButton = ({ text }) => {
  const [isCopy, setCopy] = React.useState(false);

  return (
    <Tooltip title={isCopy ? "Copied" : "Copy"} >
      <Button
        className="p-8 flex align-center"
        type="primary"
        onClick={() => {
          navigator.clipboard.writeText(text)
          setCopy(true);
          setTimeout(() => {
            setCopy(false)
          }, 2000);
        }}>
        <img src={copyImg} alt="" />
        {/* <CopyOutlined /> */}
      </Button>
    </Tooltip>
  )
}

export default CopyButton;