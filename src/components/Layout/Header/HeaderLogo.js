import React from "react";
import { ReactSVG } from "react-svg";
import Logo from "../../../assets/img/prm-logo.svg"

const HeaderLogo = () => (
  <ReactSVG className="logo-svg" src={Logo} />
);

export default HeaderLogo;