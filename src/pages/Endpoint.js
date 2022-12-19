import { ApiComponents } from "components";
import Content from "components/Layout/Content/Content";
import { moduleTypes } from "lib/contants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { clearData, getApiDocumentation } from "store/features/app";
import { setCurrentEndpoint, setCurrentOrganization, setCurrentProduct, setCurrentTag } from "store/features/organization";

const Endpoint = () => {
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
    if (product)
      dispatch(getApiDocumentation(`https://${environment}_${moduleTypes[product]}api.e-cozum.com/swagger/v1/swagger.json`));
  }, [environment, product])

  const
    handleClick = (e, item) => {
      e.stopPropagation();
      if (currentTag) {
        if (item)
          dispatch(setCurrentEndpoint(item))
        navigate(`/organizations/${organization}/${product}/${currentTag}`)
      }
      else {
        dispatch(setCurrentTag(item.name));
        dispatch(clearData([
          { key: "headerParams", initialState: [] },
          { key: "parameters", initialState: [] },
          { key: "drawerVisible", initialState: false },
          { key: "body", initialState: null },
          { key: "responseContent", initialState: null }
        ]
        ));
      }
    },

    handleBackButton = () => {
      if (!currentTag) {
        navigate(`/organizations/${organization}`);
      }
      else {
        dispatch(clearData([{ key: "currentTag", initialState: null }]))
      }
    }

  useEffect(() => {
    if (currentTag)
      setListdata({ header: "Go Back to Api List", field: "endpoint" })
    else
      setListdata({ header: "Go Back to Product List", field: "name" })
  }, [currentTag, apiDocumentation.data])
  return (
    <div>
      <div className="layout-container">
        <Content {...{
          list: {
            inputPlaceHolder: "Search API's",
            inputClassName: "input-type-secondary",
            menuListData: {
              className: "scrollable-menu",
              header: "API's",
              cardTitle: listData.header,
              list: currentTag ? apiDocumentation.data?.[currentTag] : apiDocumentation?.tags,
              onClick: handleClick,
              organizationOrProduct: organization,
              onBack: handleBackButton,
              clickable: true,
              field: "endpoint",
              withTag: true,
              withFooter: true
            }
          }
        }} >
          <ApiComponents />
        </Content>
      </div>
    </div>
  )
}

export default Endpoint;