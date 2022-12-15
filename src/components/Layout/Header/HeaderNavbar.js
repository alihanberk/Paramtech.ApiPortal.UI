import React from "react";
import { Menu } from "antd";
import Apis from "data/navbar.data.json";
import { useIntl } from "react-intl";
import LanguageSelection from "components/UIComponents/LanguageSelection";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const
    intl = useIntl(),
    navigate = useNavigate(),

    handleClick = route => {
      navigate(route)
    },

    navbarItem = Apis.map(api => ({ label: intl.formatMessage({ id: api.name }), key: api.id, onClick: () => handleClick(api.route) }));

  return (
    <div className="navbar-container">
      <Menu
        mode="horizontal"
        items={[
          { label: "Home", key: "home", onClick: () => handleClick("home") },
          ...navbarItem,
          { label: "FAQ", key: "faq", onClick: () => handleClick("faq") }
        ]}
      />
      <LanguageSelection />
    </div>
  );
}

export default Navbar;