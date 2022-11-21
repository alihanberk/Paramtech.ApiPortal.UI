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
  ]

export {
  methodColors,
  statusColor,
  httpMethods,
  parameterTypes,
  requestTypes
};