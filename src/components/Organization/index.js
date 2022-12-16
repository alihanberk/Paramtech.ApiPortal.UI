import React from "react";
import { useSelector } from "react-redux";
import apiList from "data/homePageApiList.data.json";
import testList from "data/homePageTest.data.json";
import FAQ from "data/HomeFAQ.data.json";
import { AboutAndFAQ, Hero, SummaryList } from "components/UIComponents";

const OrganizationContent = () => {
  const organization = useSelector(({ app }) => app.appSlice.currentOrganization),
    data = apiList.find(x => x.key === organization);

  return (
    <div>
      <div className="mb-48">
        <Hero {...{ title: data?.name }} />
      </div>
      <div className="mb-48">
        {
          organization &&
          <SummaryList {...{ data, isSeenAll: false }} />
        }
      </div>
      <div>
        <AboutAndFAQ {...{ data: testList, FAQData: FAQ }} />
      </div>
    </div>
  )
}

export default OrganizationContent;