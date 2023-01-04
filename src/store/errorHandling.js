import { Modal } from "antd";
import { Typography } from "components/UIComponents";
import React from "react";
import { ReactSVG } from "react-svg";
import ErrorImg from "../assets/img/error-img.svg";

const ErrorHandling = ({ message, type = "modal", callback }) => {
  switch (type) {
    case "modal":
      Modal.error({
        icon: null,
        title: null,
        centered: true,
        width: 355,
        okText: "Ok",
        className: "error-notificatiom-modal",
        content: (
          <div className="text-center">
            <ReactSVG className="text-center" src={ErrorImg} />
            <Typography.H className="text-center text-bolder mb-20" size={4}>
              sorryAnErrorOccurred
            </Typography.H>
            {
              <div dangerouslySetInnerHTML={{ __html: message }} />
            }
          </div>
        )
      });
      break;
    default:
      break;
  }
}

export default ErrorHandling;