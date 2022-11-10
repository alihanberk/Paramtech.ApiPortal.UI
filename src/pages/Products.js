import { useEffect } from "react";
import { List, PageHeader, Input } from "antd";
import products from "data/products.data.json";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentProduct } from "store/features/app";

const Applications = () => {
  const
    navigate = useNavigate(),
    dispatch = useDispatch(),
    currentOrganization = useSelector(({ app }) => app.currentOrganization),


    onProductClick = product => {
      dispatch(setCurrentProduct(product));
      navigate(`/organizations/${currentOrganization.id}/${product.id}`);
    };


  useEffect(() => {
    if (!currentOrganization)
      navigate(-1)
  }, [currentOrganization, navigate]);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title={currentOrganization?.name}
        subTitle={currentOrganization?.description}
      />
      <div className="container">
        <Input.Search placeholder="input search text" size="large" className="mb-16" />
        {
          <List
            itemLayout="horizontal"
            dataSource={products}
            bordered
            renderItem={product => (
              <List.Item
                className="pointer"
                onClick={() => onProductClick(product)}
              >
                <List.Item.Meta
                  title={product.name}
                  description={product.description}
                />
              </List.Item>
            )}
          />
        }
      </div>
    </div>
  )
};

export default Applications;