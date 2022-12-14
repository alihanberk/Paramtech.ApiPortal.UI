import { classNames } from "lib/helpers";
import React from "react";

const H = ({ size = 1, type = "primary", color, children, className }) => {
  const Tag = `h${size}`;
  return (
    <Tag className={classNames([type, className])} style={color ? { color } : null}>
      {children}
    </Tag>
  );
};

export default H;