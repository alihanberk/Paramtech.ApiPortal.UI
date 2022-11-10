import axios from "axios";

class service {

  static base = axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  static get = endpoint => this.base(endpoint);
}

export default service;

