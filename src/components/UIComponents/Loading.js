import React from "react";
import { LoadingOutlined } from '@ant-design/icons';


const Loading = ({ loading = true, children, style, size = "", className = "", element = "div" }) => {

  const
    Element = element,

    Loader = () => (
      <Element className={`loading ${size} ${className}`}>
        <LoadingOutlined />
      </Element>
    ),

    renderChildren = () => {
      if (children) return children;
    };

  return (
    loading
      ? <Loader />
      : renderChildren()
  );
};

export default Loading;