import React from "react";
import HeaderLogo from "./HeaderLogo";
import Navbar from "./HeaderNavbar";

const Header = () => (
  <div className="header-container">
    <HeaderLogo />
    <Navbar />
  </div>
);

export default Header;