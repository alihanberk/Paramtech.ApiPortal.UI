import React from "react";
import { classNames } from "lib/helpers";

const Label = ({ color, children, className, size = "", onClick, title = false, description = false, error = undefined, style = {}, colorType }) => (
  <label
    onClick={onClick}
    style={{ ...style, color }}
    className={classNames([
      className,
      size,
      title && "title",
      description && "description",
      colorType,
      error !== undefined
        ? `error-label ${error ? "error-active" : ""}`
        : false
    ])}
  >
    {children}
  </label>
);

export default Label;
