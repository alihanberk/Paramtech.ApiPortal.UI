import { getcURL, getFetchString } from "./helpers";

const
  methodColors = {
    get: "blue",
    post: "green",
    put: "orange",
    delete: "red"
  },

  statusColor = {
    200: "green",
    300: "blue",
    400: "red",
    500: "orange"
  },

  httpMethods = {
    get: "get",
    getAll: "getAll",
    post: "post",
    put: "put",
    delete: "delete",
    patch: "patch",
    getWithPost: "getWithPost"
  },

  parameterTypes = {
    header: "header",
    query: "query",
    path: "path"
  },

  requestTypes = [
    { type: "bash", function: payload => getcURL(payload) },
    { type: "js", function: payload => getFetchString(payload) },
  ],

  moduleTypes = {
    netekstre: "nte",
    netahsilat: "nth",
    tenant: "tenant",
    pos: "pos",
    tos: "tos",
    posrapor: "posrapor",
    dbs: "dbs"
  },

  pageTypes = {
    product: "product",
    organization: "organization",
    developer: "developer"
  },

  requestLanguages = {
    js: "Javascript",
    bash: "cURL"
  },

  responseModalDetailType = {
    exampleValue: "Example Value",
    schema: "Schema"
  },

  organizationTypes = [
    { name: "finrota" },
    { name: "kredim" },
    { name: "param" }
  ],

  navbarKeys = [
    {name: "faq"},
    {name: "kredim"},
    {name: "param"},
    {name: "finrota"},
    {name: "home"}
  ]

export {
  methodColors,
  statusColor,
  httpMethods,
  parameterTypes,
  requestTypes,
  moduleTypes,
  pageTypes,
  requestLanguages,
  responseModalDetailType,
  organizationTypes,
  navbarKeys
};