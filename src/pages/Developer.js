import DeveloperPage from "components/DeveloperPage";
import Content from "components/Layout/Content/Content";
import { moduleTypes, pageTypes } from "lib/contants";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getApiDocumentation } from "store/features/app";
import { setCurrentOrganization, setCurrentProduct } from "store/features/organization";
import { setSiderProps } from "store/features/sider";

const Developer = () => {
  const [
    organization,
    environment,
    product,
    apiDocumentation,
    currentTag
  ] = useSelector(({ app }) => [
    app.organization.currentOrganization,
    app.appSlice.environment,
    app.organization.currentProduct,
    app.appSlice.normalizedApiDocumentation,
    app.organization.currentTag
  ]),
    params = useParams(),
    [listData, setListdata] = React.useState({ header: "", list: [], field: "" }),

    location = useLocation(),
    dispatch = useDispatch();

  React.useEffect(() => {
    if (!organization && params.organizationId && params.applicationId) {
      dispatch(setCurrentOrganization(params.organizationId))
      dispatch(setCurrentProduct(params.applicationId))
    }
  }, [organization, location, dispatch, params]);

  React.useEffect(() => {
    const
      list = {
        placeholder: "Search API's",
        data: {
          className: "scrollable-menu",
          cardTitle: listData.header,
          list: currentTag ? apiDocumentation.data?.[currentTag] : apiDocumentation?.tags,
          organizationOrProduct: organization,
          clickable: true,
          field: listData.field,
          withTag: !!currentTag,
          withFooter: !!currentTag,
          type: currentTag ? pageTypes.developer : pageTypes.product,
          page: pageTypes.developer
        }
      }
    dispatch(setSiderProps(list));
  }, [currentTag, apiDocumentation, listData, dispatch, organization]);

  React.useEffect(() => {
    if (product)
      dispatch(getApiDocumentation(`https://${environment}_${moduleTypes[product]}api.e-cozum.com/swagger/v1/swagger.json`));
  }, [environment, product, dispatch]);

  React.useEffect(() => {
    if (currentTag)
      setListdata({ header: "Go Back to Api List", field: "endpoint" })
    else
      setListdata({ header: "Go Back to Product List", field: "name" })
  }, [currentTag, apiDocumentation.data]);


  return (
    <Content>
      <DeveloperPage />
    </Content>
  )
}

export default Developer;