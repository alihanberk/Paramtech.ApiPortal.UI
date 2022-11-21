import axios from "axios";
import { httpMethods } from "lib/contants";
import { getParameterString } from "lib/helpers";
class service {

  static base = axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  static submit = (method, url, headers, data, parameters) => {
    return new Promise((resolve, reject) => {
      const
        str = getParameterString(parameters),
        requestUrl = url + (str !== "" ? `${str}` : ""),
        axiosParameters = [httpMethods.patch, httpMethods.post, httpMethods.put].includes(method)
          ? [requestUrl, data, { headers }]
          : [requestUrl, { headers }];

      this.base[method](...axiosParameters)
        .then(response => {
          resolve({ data: response.data, statusCode: response.status });
        })
        .catch(error => {
          if (error.response) {
            reject({ data: error.response.data, statusCode: error.response.data })
          }
        })

    })
  }


  static getRequest = endpoint => this.base(endpoint);

  static get = payload => {
    let endpoint = payload.url, headers = {}, params = {};
    if (payload.id) endpoint += `/${payload.id}`;
    if (payload.headers) {
      headers = { ...payload.headers };
      delete payload.headers;
    }
    if (payload.parameters) {
      params = { ...payload.parameters };
      delete payload.parameters;
    }

    return this.submit("get", `${endpoint}`, headers, undefined, params)
  }

  static post = payload => {
    let endpoint = payload.url, headers = {}, params = {};
    if (payload.id) endpoint += `/${payload.id}`;
    if (payload.headers) {
      headers = { ...payload.headers };
      delete payload.headers;
    }
    if (payload.parameters) {
      params = { ...payload.parameters };
      delete payload.parameters;
    }

    return this.submit("post", `${endpoint}`, headers, payload.data, params)
  }

  static put = payload => {
    let endpoint = payload.url, headers = {}, params = {};
    if (payload.id) endpoint += `/${payload.id}`;
    if (payload.headers) {
      headers = { ...payload.headers };
      delete payload.headers;
    }
    if (payload.parameters) {
      params = { ...payload.parameters };
      delete payload.parameters;
    }

    return this.submit("put", `${endpoint}`, headers, payload.data, params)
  }

  static delete = payload => {
    let endpoint = payload.url, headers = {}, params = {};
    if (payload.id) endpoint += `/${payload.id}`;
    if (payload.parameters) {
      params = { ...payload.parameters };
      delete payload.parameters;
    }

    return this.submit("delete", `${endpoint}`, undefined, undefined, params)
  }
}

export default service;

