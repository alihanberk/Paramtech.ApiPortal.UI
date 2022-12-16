import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiList from "data/homePageApiList.data.json";
import testList from "data/homePageTest.data.json";
import FAQ from "data/HomeFAQ.data.json";
import { AboutAndFAQ, Hero, SummaryList } from "components/UIComponents";
import { useLocation } from "react-router-dom";
import { setCurrentProduct } from "store/features/app";

const OrganizationContent = () => {
  const product = useSelector(({ app }) => app.appSlice.currentProduct),
    data = apiList.find(x => x.key === product),
    location = useLocation(),
    dispatch = useDispatch();

  useEffect(() => {
    if (!product && location.pathname.split("/")[2])
      dispatch(setCurrentProduct(location.pathname.split("/")[2]))
  }, [product, location])

  return (
    <div>
      <div className="mb-48">
        <Hero {...{ title: data?.name }} />
      </div>
      <div className="mb-48">
        {
          product &&
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