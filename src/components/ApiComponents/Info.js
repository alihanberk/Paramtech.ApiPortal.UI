import React from "react";
import { useSelector } from "react-redux";

const Info = () => {
  const apiDocumentation = useSelector(({ app }) => app.apiDocumentation);
  return (
    <div>
      {apiDocumentation.info?.title}
    </div>
  );
};

export default Info;