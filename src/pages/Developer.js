import DeveloperPage from "components/DeveloperPage";
import Content from "components/Layout/Content/Content";
import { pageTypes } from "lib/contants";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setCurrentOrganization, setCurrentProduct } from "store/features/organization";
import { setSiderProps } from "store/features/sider";

const Developer = () => {
  const [
    organization,
    documentation,
    currentTag
  ] = useSelector(({ app }) => [
    app.organization.currentOrganization,
    app.documentation,
    app.organization.currentTag
  ]),
    [listData, setListdata] = React.useState({ header: "", list: [], field: "" }),
    dispatch = useDispatch();

  React.useEffect(() => {
    const
      list = {
        searchFields: currentTag?.tag ? "endpoint" : "name",
        placeholder: "Search API's",
        data: {
          className: "scrollable-menu",
          cardTitle: listData.header,
          list: currentTag?.tag ? documentation.normalizedData.data?.[currentTag?.tag] : documentation.normalizedData?.tags,
          organizationOrProduct: organization,
          clickable: true,
          field: listData.field,
          withTag: !!currentTag?.tag,
          withFooter: !!currentTag?.tag,
          type: currentTag?.tag ? pageTypes.developer : pageTypes.product,
          page: pageTypes.developer
        }
      }
    dispatch(setSiderProps(list));
  }, [currentTag, documentation, listData, dispatch, organization]);

  React.useEffect(() => {
    if (currentTag?.tag)
      setListdata({ header: "Go Back to Api List", field: "endpoint" })
    else
      setListdata({ header: "Go Back to Product List", field: "name" })
  }, [currentTag, documentation.normalizedData.data]);

  return (
    <Content>
      <DeveloperPage />
    </Content>
  )
}

export default Developer;