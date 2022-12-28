import React from "react";
import { Tooltip } from "antd";

const Description = ({ text, limit, tooltip = true, tooltipMessage = null, getContainer, className }) => {
  const _limit = limit || 40;
  return (
    <div className={className}>
      {
        text ?
          text.toString().replace(/\s+/g, " ").trim().length > _limit ?
            tooltip ?
              <Tooltip openClassName="#description" title={tooltipMessage || text}>
                {`${text.toString().replace(/\s+/g, " ").trim().substr(0, _limit)}...`}
              </Tooltip>
              :
              `${text.toString().replace(/\s+/g, " ").trim().substr(0, _limit)}...`
            :
            text
          :
          ""
      }
    </div >
  );
};

export default Description;