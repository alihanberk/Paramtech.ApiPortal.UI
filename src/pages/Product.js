import Content from "components/Layout/Content/Content";
import { moduleTypes, pageTypes } from "lib/contants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentation } from "store/features/documentation";
import { clearSiderProps, setSiderProps } from "store/features/sider";


const Product = () => {
  const [
    organization,
    documentation,
    currentTag,
  ] = useSelector(({ app }) => [
    app.organization.currentOrganization,
    app.documentation,
    app.organization.currentTag,
  ]),
    [listData, setListdata] = useState({ header: "", list: [], field: "" }),

    dispatch = useDispatch();

  useEffect(() => {
    const
      list = {
        searchFields: currentTag?.tag ? "endpoint" : "name",
        placeholder: "Search API's",
        data: {
          stateKey: "documentation",
          className: "scrollable-menu",
          header: "API's",
          cardTitle: listData.header,
          list: currentTag?.tag ? documentation.normalizedData.data?.[currentTag?.tag] : documentation.normalizedData?.tags,
          organizationOrProduct: organization,
          clickable: true,
          field: listData.field,
          withTag: !!currentTag?.tag,
          withFooter: !!currentTag?.tag,
          type: currentTag?.tag ? pageTypes.developer : pageTypes.product,
          page: pageTypes.product
        }
      }
    dispatch(setSiderProps(list));
  }, [currentTag, documentation, listData, dispatch, organization]);

  useEffect(() => {
    if (currentTag?.tag)
      setListdata({ header: "Go Back to Api List", field: "endpoint" })
    else
      setListdata({ header: "Go Back to Product List", field: "name" })
  }, [currentTag, documentation.normalizedData.data]);


  return (
    <Content>
      Read me sayfası
    </Content>
  )
}

export default Product;