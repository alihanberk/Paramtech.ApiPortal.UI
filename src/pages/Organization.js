import Content from "components/Layout/Content/Content";
import OrganizationContent from "components/Organization";
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
  });


  useEffect(() => {
    const
      list = {
        placeholder: "Search Product",
        data: {
          className: "scrollable-menu",
          header: "API's",
          cardTitle: "Go Back to Home Page",
          list: importList,
          organizationOrProduct: organization,
          clickable: true,
          field: "name",
          type: "organization"
        }
      }
    dispatch(setSiderProps(list));
  }, [organization]);



  return (
    <Content>
      <OrganizationContent />
    </Content>
  )
}

export default Organization;