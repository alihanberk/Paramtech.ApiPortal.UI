import { ApiComponents } from "components";
import Content from "components/Layout/Content/Content";
import { moduleTypes, pageTypes } from "lib/contants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { clearData, getApiDocumentation } from "store/features/app";
import { setCurrentEndpoint, setCurrentOrganization, setCurrentProduct, setCurrentTag } from "store/features/organization";
import { setSiderProps } from "store/features/sider";

const Developer = () => {
  const [
    organization,
    environment,
    product,
    apiDocumentation,
    currentEndpoint,
    currentTag
  ] = useSelector(({ app }) => [
    app.organization.currentOrganization,
    app.appSlice.environment,
    app.organization.currentProduct,
    app.appSlice.normalizedApiDocumentation,
    app.organization.currentEndpoint,
    app.organization.currentTag
  ]),
    params = useParams(),
    [listData, setListdata] = useState({ header: "", list: [], field: "" }),

    location = useLocation(),
    dispatch = useDispatch(),
    navigate = useNavigate();

  useEffect(() => {
    if (!organization && params.organizationId && params.applicationId) {
      dispatch(setCurrentOrganization(params.organizationId))
      dispatch(setCurrentProduct(params.applicationId))
    }
  }, [organization, location]);

  useEffect(() => {
    const
      list = {
        placeholder: "Search API's",
        data: {
          className: "scrollable-menu",
          header: "API's",
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

  useEffect(() => {
    if (product)
      dispatch(getApiDocumentation(`https://${environment}_${moduleTypes[product]}api.e-cozum.com/swagger/v1/swagger.json`));
  }, [environment, product]);

  useEffect(() => {
    if (currentTag)
      setListdata({ header: "Go Back to Api List", field: "endpoint" })
    else
      setListdata({ header: "Go Back to Product List", field: "name" })
  }, [currentTag, apiDocumentation.data]);


  return (
    <Content>
      <ApiComponents />
    </Content>
  )
}

export default Developer;