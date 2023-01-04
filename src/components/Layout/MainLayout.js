import React, { useEffect } from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header/Header';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import BrandHeader from './BrandHeader';
import ContentList from './Content/ContentList';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEndpoint, setCurrentOrganization, setCurrentProduct, setCurrentTag } from 'store/features/organization';
import { FullPageLoading } from 'components/UIComponents';
import { getDocumentation } from 'store/features/documentation';
import { moduleTypes, organizationTypes } from 'lib/contants';
import { splitAndCombineByHyphen } from 'lib/helpers';
import _ from 'lodash';
import { clearOrganizationState } from "store/features/organization";

const MainLayout = ({ withSider }) => {
  const
    param = useParams(),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    [organization, product, brandVisible, environment, documentation, currentProduct, currentEndpoint] = useSelector(({ app }) => [app.organization.currentOrganization, app.organization.currentProduct, app.appSlice.brandVisible, app.appSlice.environment, app.documentation, app.organization.currentProduct, app.organization.currentEndpoint])

  useEffect(() => {
    if (param.organizationId) {
      let organizationData = [];
      if (param.organizationId !== organization) {
        if (!organizationTypes.find(x => x.name === param.organizationId)) {
          dispatch(clearOrganizationState(["currentTag", "currentEndpoint", "currentProduct", "currentOrganization"]));
          navigate("/home");
        }
        else {
          dispatch(setCurrentOrganization(param.organizationId));
        }
      }
      if (param.applicationId && param.applicationId !== currentProduct) {
        organizationData = require(`../../data/${param.organizationId}ProductName.data.json`);
        if (!organizationData.find(x => x.route === param.applicationId)) {
          dispatch(clearOrganizationState(["currentTag", "currentEndpoint", "currentProduct", "currentOrganization"]));
          navigate("/home");
        }
        else {
          dispatch(setCurrentProduct(param.applicationId));
        }
      }
      if (param.endpointId) {
        const { key, tag } = splitAndCombineByHyphen(param.endpointId);
        if (documentation.normalizedData.data && param.methodId && _.isEmpty(currentEndpoint)) {
          const endpoint = documentation.normalizedData.data?.[tag]?.find(x => x.method === param.methodId && x.endpoint.includes(key));
          if (endpoint) {
            dispatch(setCurrentEndpoint(endpoint));
            dispatch(setCurrentTag({ tag: tag, pathTag: param.endpointId, apiKey: key }));
          }
          else {
            dispatch(clearOrganizationState(["currentTag", "currentEndpoint", "currentProduct", "currentOrganization"]));
            navigate("/home");
          }
        }
      }
    }
  }, [param, organization, documentation.normalizedData]);


  useEffect(() => {
    if (product && !brandVisible)
      dispatch(getDocumentation(`https://${environment}_${moduleTypes[product]}api.e-cozum.com/swagger/v1/swagger.json`));
  }, [environment, product, brandVisible]);


  return (
    <Layout>
      <Layout.Header className="header">
        <HeaderComponent />
      </Layout.Header>
      <FullPageLoading message="Ortam değiştiriliyor" />
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