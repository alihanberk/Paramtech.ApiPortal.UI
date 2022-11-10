
import React, { useEffect } from "react";
import { PageHeader, Tag } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApiComponents from "components/ApiComponents";

const Products = () => {
  const
    navigate = useNavigate(),
    [currentOrganization, currentProduct] = useSelector(({ app }) => [app.currentOrganization, app.currentProduct])

  useEffect(() => {
    if (!currentOrganization || !currentProduct)
      navigate(-1)
  }, [currentOrganization, currentProduct, navigate]);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title={`${currentOrganization?.name} | ${currentProduct?.name}`}
        subTitle={<>{currentProduct?.description}  <Tag className="ml-8" color="purple"> Test</Tag></>}
      />
      <ApiComponents />
    </div>
  );
};
export default Products;