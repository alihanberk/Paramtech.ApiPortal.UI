import { classNames } from "lib/helpers";
import React from "react";

const P = ({ color, children, className, size = "", __html, onClick }) => (
  <p
    className={classNames([
      className,
      size
    ])}
    style={color ? { color } : null}
    onClick={onClick}
    dangerouslySetInnerHTML={children ? undefined : { __html }}
  >
    {children || undefined}
  </p>
);

export default P;
