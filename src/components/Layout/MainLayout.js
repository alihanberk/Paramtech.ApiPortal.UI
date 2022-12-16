import React from 'react';
import { Layout } from 'antd';
import HeaderComponent  from './Header/Header';
import { Outlet } from 'react-router-dom';
import BrandHeader from './BrandHeader';

const MainLayout = () => {
    return(
        <Layout>
          <Layout.Header className="header">
            <HeaderComponent />
          </Layout.Header>
          <BrandHeader />
          <Layout.Content>
            <Outlet />
          </Layout.Content>
        </Layout>
    )
}

export default MainLayout;