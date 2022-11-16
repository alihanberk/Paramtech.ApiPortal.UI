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

export const bindParameters = (data, type, initialValue = "") => {
  let
    parameter = "",
    requestParameter = initialValue;

  data.map((x, i) => {
    switch (type) {
      case "header":
        if (x.value !== "") {
          parameter = `'${x.name}: ${x.value}'`;
          requestParameter += `    -H ${parameter}\n`;
        }
        break;
      case "query":
        if (x.value !== "") {
          parameter = `${x.name}=${x.value}`;
          requestParameter = requestParameter.slice(0, -1) + `${i === 0 ? "?" : i === data.length - 1 ? "&" : ""}${parameter}'`;
        }
        break;

      default:
        break;
    }
    return requestParameter;
  })

  return requestParameter;
}