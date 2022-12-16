import Content from "components/Layout/Content/Content";
import OrganizationContent from "components/Organization";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCurrentOrganization, setCurrentProduct } from "store/features/app";

const Organization = () => {
  const organization = useSelector(({ app }) => app.appSlice.currentOrganization),
    importList = organization ? require(`../data/${organization}ProductName.data.json`) : [],
    params = useParams(),

    location = useLocation(),
    dispatch = useDispatch(),
    navigate = useNavigate();

  useEffect(() => {
    if (!organization && params.organizationId)
      dispatch(setCurrentOrganization(params.organizationId))
  }, [organization, location]);

  const handleClick = (e, item) => {
    e.stopPropagation();
    if (item.route)
      dispatch(setCurrentProduct(item.route))
    navigate(`/organizations/${organization}/${item.route}`)
  },

    handleBackButton = () => {
      navigate("/home");
    }

  return (
    <div className="layout-container">
      <Content {...{
        list: {
          inputPlaceHolder: "Search Product",
          inputClassName: "input-type-secondary",
          menuListData: {
            className: "scrollable-menu",
            header: "API's",
            cardTitle: "Go Back to Home Page",
            list: importList,
            onClick: handleClick,
            organizationOrProduct: organization,
            onBack: handleBackButton,
            clickable: true,
            field: "name"
          }
        }
      }} >
        <OrganizationContent />
      </Content>
    </div>
  )
}

export default Organization;