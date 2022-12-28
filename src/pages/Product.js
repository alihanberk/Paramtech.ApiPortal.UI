import Content from "components/Layout/Content/Content";
import { moduleTypes, pageTypes } from "lib/contants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiDocumentation } from "store/features/app";
import { clearSiderProps, setSiderProps } from "store/features/sider";

const Product = () => {
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
    [listData, setListdata] = useState({ header: "", list: [], field: "" }),

    dispatch = useDispatch();

  useEffect(() => {
    if (product)
      dispatch(getApiDocumentation(`https://${environment}_${moduleTypes[product]}api.e-cozum.com/swagger/v1/swagger.json`));
  }, [product, environment]);

  useEffect(() => {
    const
      list = {
        searchFields: currentTag ? "endpoint" : "name",
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
          page: pageTypes.product
        }
      }
    dispatch(setSiderProps(list));
  }, [currentTag, apiDocumentation, listData, dispatch, organization]);

  useEffect(() => {
    if (currentTag)
      setListdata({ header: "Go Back to Api List", field: "endpoint" })
    else
      setListdata({ header: "Go Back to Product List", field: "name" })
  }, [currentTag, apiDocumentation.data]);


  return (
    <Content>
      deneme
    </Content>
  )
}

export default Product;