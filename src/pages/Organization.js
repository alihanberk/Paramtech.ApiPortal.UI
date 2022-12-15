import Content from "components/Layout/Content/Content";
import OrganizationContent from "components/Organization";
import React from "react";
import { useSelector } from "react-redux";
import app from "store/features/app";

const Organization = () => {
  const product = useSelector(({ app }) => app.appSlice.currentProduct);
  console.log(product)
  return (
    <div className="layout-container">
      <Content {...{
        list: {
          inputPlaceHolder: "Search Product",
          inputClassName: "input-type-secondary",
          menuListData: {
            header: "API's",
            cardTitle: "Go Back to Home Page",
            list: [
              { title: "Deneme" },
              { title: "Deneme" },
              { title: "Deneme" },
              { title: "Deneme" }
            ],
            organization: "param"
          }
        }
      }} >
        <OrganizationContent />
      </Content>
    </div>
  )
}

export default Organization;