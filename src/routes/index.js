const appRoutes = [
  {
    path: "/home",
    name: "home",
    component: require("pages/Home").default,
  },
  {
    path: "/organizations",
    name: "organizations",
    component: require("pages/Organizations").default,
  },
  {
    path: "/organizations/:organizationId/:applicationId",
    name: "products",
    component: require("pages/ProductOld").default,
  },
  {
    path: "/organizations/:organizationId",
    name: "organizations",
    component: require("pages/Organization").default,
  }
];

export default appRoutes;