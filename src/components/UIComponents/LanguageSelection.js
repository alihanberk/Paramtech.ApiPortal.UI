import { Divider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "store/features/language";

const LanguageSelection = () => {
  const language = useSelector(({ app }) => app.languageSlice.language),
    dispatch = useDispatch(),

    handleLanguageChange = e => {
      dispatch(changeLanguage(e.target.id.toString()))
    };

  return (
    <div className="lang-selection">
      <span id="tr" className={`language ${language === "tr" ? "active": ""}`} onClick={e => handleLanguageChange(e)}>TR</span>
      <Divider type="vertical" />
      <span id="en" className={`language ${language === "en" ? "active": ""}`} onClick={e => handleLanguageChange(e)}>EN</span>
    </div >
  );
}

export default LanguageSelection;