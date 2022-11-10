import { Button, Divider, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { methodColors } from "../../../lib/contants";


const Info = ({ currentEndpoint }) => (
  <div>
    <div>
      <Tag className="content-header-tag" color={methodColors[currentEndpoint?.method]}>{currentEndpoint?.method.toUpperCase()}</Tag>
      <label className="content-label">{currentEndpoint?.endpoint}</label>
    </div>
  </div>
);

export default Info;