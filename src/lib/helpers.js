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