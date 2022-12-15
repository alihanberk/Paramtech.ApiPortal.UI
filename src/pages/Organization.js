import Content from "components/Layout/Content/Content";
import OrganizationContent from "components/Organization";
import React from "react";

const Organization = () => {  

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
            organization: ""
          }
        }
      }}>
        <OrganizationContent />
      </Content>
    </div>
  )
}

export default Organization;