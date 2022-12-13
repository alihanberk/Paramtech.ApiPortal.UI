import { ConfigProvider, Layout } from "antd";
import "assets/less/main.less";
import LanguageSelection from "components/layouts/headers/LanguageSelection";
import Logo from "components/Logo";
import { Route, Routes, Navigate } from "react-router-dom";
import appRoutes from "routes";
import trTR from "antd/lib/locale-provider/tr_TR";
import enUS from "antd/lib/locale-provider/en_US";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import tr from "../src/lang/tr.json";
import en from "../src/lang/en.json";
import Header from "components/Layout/Header";


const
  locales = {
    tr,
    en
  },
  antLocales = {
    tr: trTR,
    en: enUS
  };

const App = () => {
  const language = useSelector(({ app }) => app.language);

  return (
    <IntlProvider locale={language} messages={locales[language]}>
      <ConfigProvider locale={antLocales[language]}>
        <Layout>
          <Layout.Header className="header">
            <Header />
          </Layout.Header>
          <Layout.Content>
            <Routes>
              {
                appRoutes.map(route => (
                  <Route key={route.name} path={route.path} element={<route.component />} />
                ))
              }
              <Route path="*" element={<Navigate to="/organizations" />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    </IntlProvider>
  );
}

export default App;
