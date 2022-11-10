const appRoutes = [
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