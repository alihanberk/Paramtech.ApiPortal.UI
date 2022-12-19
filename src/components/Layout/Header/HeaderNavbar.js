import React from "react";
import { Menu } from "antd";
import Apis from "data/navbar.data.json";
import { useIntl } from "react-intl";
import LanguageSelection from "components/UIComponents/LanguageSelection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearOrganizationState, setCurrentOrganization } from "store/features/organization";

const Navbar = () => {
  const
    intl = useIntl(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    clearFields = ["currentOrganization", "currentTag", "currentEndpoint", "currentProduct"],

    handleClick = (route, key, fields) => {
      dispatch(clearOrganizationState(fields))
      key && dispatch(setCurrentOrganization(key));
      navigate(route);
    },

    navbarItem = Apis.map(api => ({ label: intl.formatMessage({ id: api.name }), key: api.id, onClick: () => handleClick(api.route, api.product, clearFields) }));

  return (
    <div className="navbar-container">
      <Menu
        mode="horizontal"
        items={[
          { label: "Home", key: "home", onClick: () => handleClick("home", null, clearFields) },
          ...navbarItem,
          { label: "FAQ", key: "faq", onClick: () => handleClick("faq", null, clearFields) }
        ]}
      />
      <LanguageSelection />
    </div>
  );
}

export default Navbar;