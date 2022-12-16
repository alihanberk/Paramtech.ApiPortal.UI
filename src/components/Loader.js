
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
const Loader = () => {
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100wh"}}>
      <Spin indicator={antIcon} />;
    </div>
  );
}

export default Loader;
