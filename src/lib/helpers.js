import { isEmpty } from "lodash";
import { parameterTypes } from "./contants";

export const objectFilterByEmptyValue = object => {
  for (const [key, value] of Object.entries(object)) {
    if (value === "")
      delete object[key];
  }
  return Object.assign({}, object);
};

export const getParameterString = (obj, prefix) => {

  let p;
  const
    str = [],
    _obj = obj;

  for (p in _obj)
    if (Object.prototype.hasOwnProperty.call(_obj, p)) {
      const k = prefix ? `${prefix}[${p}]` : p,
        v = _obj[p];
      str.push((v !== null && typeof v === "object") ?
        getParameterString(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    }
  return str.join("&");
};

export const endpointManipulation = (endpoint, value) => {
  let parameter = endpoint.split("/");
  parameter[parameter.length - 1] = value;
  parameter = parameter.toString().replaceAll(",", "/")
  return parameter;
}

export const getQueryString = (data, requestParameter) => {
  if (data.value !== "") {
    const
      parameter = `${data.name}=${data.value}`;
    requestParameter += `${requestParameter.indexOf("?") === -1 ? "?" : "&"}${parameter}`;
  }

  return requestParameter;
}

export const bindParameters = (data, type, initialValue = "") => {
  let
    parameter = "",
    requestParameter = initialValue;

  data.map((x, i) => {
    switch (type) {
      case "header":
        if (x.value !== "") {
          parameter = `'${x.name}: ${x.value}'`;
          requestParameter += `   -H ${parameter}\n`;
        }
        break;
      case "query":
        requestParameter = getQueryString(x, requestParameter);
        break;
      case "path":
        if (x.value !== "") {
          requestParameter = endpointManipulation(requestParameter, x.value);
        }
        break;

      default:
        break;
    }
    return requestParameter;
  })

  return requestParameter;
}

export const groupingParameter = _parameters => {
  let data = {};

  Object.keys(parameterTypes).forEach(key => {
    if (_parameters.filter(x => x.place === key).length)
      data[key] = _parameters.filter(x => x.place === key)
  })
  return data;
}

export const getRequestPayload = (token, currentEndpoint, parameters, queryType) => {
  const
    _parameters = { headers: [], parameters: queryType === "stringQuery" ? "" : [], path: currentEndpoint.endpoint, url: "" };
  parameters.forEach(element => {
    if (element.place === parameterTypes.query) {
      if (queryType === "stringQuery")
        _parameters.parameters = getQueryString(element, _parameters.parameters)
      else if (queryType === "objectQuery") {
        console.log(element)
        _parameters.parameters[element["name"]] = element["value"];
      }
    }
    else if (element.place === parameterTypes.header)
      _parameters.headers[element["name"]] = element["value"];
    else if (element.place === parameterTypes.path && element.value !== "")
      _parameters.path = endpointManipulation(_parameters.path, element.value);
  });
  if (token)
    _parameters.headers["Authorization"] = token;

  _parameters.url = `https://test_tenantapi.e-cozum.com${_parameters.path}${queryType === "stringQuery" ? _parameters.parameters : ""}`;

  return _parameters;
}

export const getcURL = ({ currentEndpoint, token, parameters, body }) => {
  let
    endpoint = currentEndpoint.endpoint,
    url = "https://test_tenantapi.e-cozum.com",
    requestParameter = "",
    requestHeader = " -H 'Content-Type: application/json'\n",
    requestBody = "",
    groupedData = groupingParameter(parameters);

  if (token) {
    requestHeader += `   -H 'Authorization: ${token}'\n`;
  };
  if (body) {
    requestBody += `  -d '${JSON.stringify(body, undefined, 3)}'`
  }

  Object.keys(groupedData)?.map(key => {
    if (key === "header")
      return requestHeader += bindParameters(groupedData[key], key)
    else if (key === "query")
      return requestParameter = bindParameters(groupedData[key], key, requestParameter)
    else if (key === "path")
      return endpoint = bindParameters(groupedData[key], key, endpoint)

    return true;
  })

  return `curl -X ${currentEndpoint.method.toUpperCase()} '${url}${endpoint}${requestParameter}'
  ${requestHeader}
  ${requestBody}`;
}

export const getFetchString = ({ currentEndpoint, token, parameters, body }) => {
  const
    _parameters = getRequestPayload(token, currentEndpoint, parameters, "stringQuery"),
    _defaultHeaders = { "Content-Type": "application/json" },
    headers = { ...objectFilterByEmptyValue(_parameters.headers), ..._defaultHeaders };

  return (`fetch('${_parameters.url}', { 
    method: '${currentEndpoint.method.toUpperCase()}',
    ${!isEmpty(headers) ? `headers: ${JSON.stringify(headers, undefined, 3)},` : ""}
    ${body ? `body: ${JSON.stringify(body, undefined, 4)},` : ""}
    })`).replaceAll('"', "'");
}