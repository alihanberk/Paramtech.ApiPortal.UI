import Content from "components/Layout/Content/Content";
import OrganizationContent from "components/Organization";
import { pageTypes } from "lib/contants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSiderProps, setSiderProps } from "store/features/sider";

const Organization = () => {
  const
    organization = useSelector(({ app }) => app.organization.currentOrganization),
    importList = organization ? require(`../data/${organization}ProductName.data.json`) : [],
    dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(clearSiderProps());
  }, [dispatch]);


  useEffect(() => {
    const
      list = {
        searchFields: "name",
        placeholder: "Search Product",
        data: {
          className: "scrollable-menu",
          header: "API's",
          cardTitle: "Go Back to Home Page",
          list: importList,
          organizationOrProduct: organization,
          clickable: true,
          field: "name",
          page: pageTypes.organization
        }
      }
    dispatch(setSiderProps(list));
  }, [organization, dispatch]);



  return (
    <Content>
      <OrganizationContent />
    </Content>
  )
}

export default Organization;