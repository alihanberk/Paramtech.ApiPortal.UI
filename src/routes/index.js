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
    path: "/organizations/:organizationId",
    name: "products",
    component: require("pages/Products").default,
  },
  {
    path: "/organizations/:organizationId/:applicationId",
    name: "products",
    component: require("pages/Product").default,
  }
];

export default appRoutes;