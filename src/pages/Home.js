import Hero from "components/HomeComponents/Hero";
import { AboutAndFAQ, SummaryList } from "components/UIComponents";
import React from "react";
import apiList from "data/homePageApiList.data.json";
import testList from "data/homePageTest.data.json";
import FAQ from "data/HomeFAQ.data.json";
import { Divider } from "antd";

const Home = () => {
  return (
    <div className="home">
      <div className="color-white-2">
        <Hero />
      </div>
      <div className="layout-container pt-64 mb-96 home-list">
        {
          apiList.map((api, i) => (
            <>
              <SummaryList {...{ data: api }} />
              {i !== apiList.length - 1 && <Divider className="home-list-divider mb-48" />}
            </>
          ))
        }
      </div>
      <div className="layout-container">
        <AboutAndFAQ {...{ data: testList, FAQData: FAQ }} />
      </div>
    </div>
  )
}

export default Home;