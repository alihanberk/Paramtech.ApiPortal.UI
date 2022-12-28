import Content from "components/Layout/Content/Content";
import { moduleTypes, pageTypes } from "lib/contants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentation } from "store/features/documentation";
import { clearSiderProps, setSiderProps } from "store/features/sider";


const Product = () => {
  const [
    organization,
    environment,
    product,
    documentation,
    currentTag,
    brandVisible
  ] = useSelector(({ app }) => [
    app.organization.currentOrganization,
    app.appSlice.environment,
    app.organization.currentProduct,
    app.documentation,
    app.organization.currentTag,
    app.appSlice.brandVisible,
  ]),
    [listData, setListdata] = useState({ header: "", list: [], field: "" }),

    dispatch = useDispatch();

  useEffect(() => {
    if (product && !brandVisible)
      dispatch(getDocumentation(`https://${environment}_${moduleTypes[product]}api.e-cozum.com/swagger/v1/swagger.json`));
  }, [product, environment, brandVisible]);

  useEffect(() => {
    const
      list = {
        searchFields: currentTag ? "endpoint" : "name",
        placeholder: "Search API's",
        data: {
          className: "scrollable-menu",
          header: "API's",
          cardTitle: listData.header,
          list: currentTag ? documentation.normalizedData.data?.[currentTag] : documentation.normalizedData?.tags,
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
  }, [currentTag, documentation, listData, dispatch, organization]);

  useEffect(() => {
    if (currentTag)
      setListdata({ header: "Go Back to Api List", field: "endpoint" })
    else
      setListdata({ header: "Go Back to Product List", field: "name" })
  }, [currentTag, documentation.normalizedData.data]);


  return (
    <Content>
      deneme
    </Content>
  )
}

export default Product;