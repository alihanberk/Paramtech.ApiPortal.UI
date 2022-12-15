import { ConfigProvider } from "antd";
import "assets/less/main.less";
import trTR from "antd/lib/locale-provider/tr_TR";
import enUS from "antd/lib/locale-provider/en_US";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import tr from "../src/lang/tr.json";
import en from "../src/lang/en.json";

import Routes from "./routes"

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
  const language = useSelector(({ app }) => app.languageSlice.language);

  return (
    <IntlProvider locale={language} messages={locales[language]}>
      <ConfigProvider locale={antLocales[language]}>
        <Routes />
      </ConfigProvider>
    </IntlProvider>
  );
}

export default App;
