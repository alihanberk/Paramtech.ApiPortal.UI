import React, { useEffect } from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header/Header';
import { Outlet, useParams } from 'react-router-dom';
import BrandHeader from './BrandHeader';
import ContentList from './Content/ContentList';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrganization, setCurrentProduct } from 'store/features/organization';

const MainLayout = ({ withSider }) => {
  const
    param = useParams(),
    dispatch = useDispatch(),
    organization = useSelector(({ app }) => app.organization.currentOrganization)

  useEffect(() => {
    if (!organization) {
      if (param.organizationId)
        dispatch(setCurrentOrganization(param.organizationId));
      if (param.applicationId)
        dispatch(setCurrentProduct(param.applicationId));
    }
  }, [param, organization])


  return (
    <Layout>
      <Layout.Header className="header">
        <HeaderComponent />
      </Layout.Header>
      <BrandHeader />
      <Layout>
        {
          withSider &&
          <Layout.Sider className='layout-sider'>
            <ContentList />
          </Layout.Sider>
        }
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout;