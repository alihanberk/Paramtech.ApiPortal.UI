import React, { useEffect } from "react";
import { Menu } from "antd";
import Apis from "data/navbar.data.json";
import { useIntl } from "react-intl";
import LanguageSelection from "components/UIComponents/LanguageSelection";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearOrganizationState, setCurrentOrganization } from "store/features/organization";
import { getMenuSelectedKeys } from "lib/helpers";
import { clearData } from "store/features/app";

const Navbar = () => {
  const
    intl = useIntl(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    location = useLocation(),
    [selectedKeys, setSelectedKeys] = React.useState(),
    clearFields = ["currentOrganization", "currentTag", "currentEndpoint", "currentProduct"],

    handleClick = (route, key, fields) => {
      dispatch(clearOrganizationState(fields))
      dispatch(clearData(["environment"]));
      key && dispatch(setCurrentOrganization(key));
      navigate(route);
    },

    navbarItem = Apis.map(api => ({ label: intl.formatMessage({ id: api.name }), key: api.id, onClick: () => handleClick(api.route, api.product, clearFields) }));

  useEffect(() => {
    if (location)
      setSelectedKeys(getMenuSelectedKeys(location));
  }, [location])

  return (
    <div className="navbar-container">
      <Menu
        mode="horizontal"
        selectedKeys={selectedKeys}
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