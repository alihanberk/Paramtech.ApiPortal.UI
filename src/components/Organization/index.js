import Hero from "components/HomeComponents/Hero";
import React from "react";
import { useSelector } from "react-redux";
import apiList from "data/homePageApiList.data.json";
import testList from "data/homePageTest.data.json";
import FAQ from "data/HomeFAQ.data.json";
import { AboutAndFAQ, SummaryList } from "components/UIComponents";

const OrganizationContent = () => {
  const product = useSelector(({ app }) => app.appSlice.currentProduct);

  return (
    <div>
      <div className="mb-48">
        <Hero {...{ hasLayout: false, withInput: false }} />
      </div>
      <div className="mb-48">
        <SummaryList {...{ data: apiList.find(x => x.key === product), isSeenAll: false }} />
      </div>
      <div>
        <AboutAndFAQ {...{ data: testList, FAQData: FAQ }} />
      </div>
    </div>
  )
}

export default OrganizationContent;