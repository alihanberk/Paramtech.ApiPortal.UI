import Hero from "components/HomeComponents/Hero";
import React from "react";
import apiList from "data/homePageApiList.data.json";
import testList from "data/homePageTest.data.json";
import FAQ from "data/HomeFAQ.data.json";
import { AboutAndFAQ, SummaryList } from "components/UIComponents";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const OrganizationContent = () => {
  
  let { organizationId } = useParams();
  const [organizationName, setOrganizationName] = useState(organizationId)
  const product = useSelector(({ app }) => app.appSlice.currentProduct);

  useEffect(() => {
    if (product) {
      setOrganizationName(product)
    } else {
      setOrganizationName(organizationId)
    }
  }, [product])

  return (
    <div>
      <div className="mb-48">
        <Hero {...{ hasLayout: false, withInput: false }} />
      </div>
      <div className="mb-48">
        <SummaryList {...{ data: apiList.find(x => x.key === organizationName), isSeenAll: false }} />
      </div>
      <div>
        <AboutAndFAQ {...{ data: testList, FAQData: FAQ }} />
      </div>
    </div>
  )
}

export default OrganizationContent;