import React from "react";
import { Divider, Menu } from "antd";
import Apis from "data/navbar.data.json";
import { useIntl } from "react-intl";
import LanguageSelection from "components/UIComponents/LanguageSelection";

const Navbar = () => {
  const
    intl = useIntl(),
    navbarItem = Apis.map(api => ({ label: intl.formatMessage({ id: api.name }), key: api.id }));

  return (
    <div className="navbar-container">
      <Menu
        mode="horizontal"
        items={[
          { label: "Home", key: "home" },
          ...navbarItem,
          { label: "FAQ", key: "faq" }
        ]}
      />
      <LanguageSelection />
    </div>
  );
}

export default Navbar;