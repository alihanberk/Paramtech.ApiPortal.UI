import { pageTypes } from "lib/contants";
import { combineByHyphen } from "lib/helpers";
import { clearData } from "store/features/app";
import { clearDocumentation } from "store/features/documentation";
import { setCurrentEndpoint, setCurrentTag, setCurrentProduct, clearOrganizationState } from "store/features/organization";

const reducerTypes = {
  developer: setCurrentEndpoint,
  organization: setCurrentProduct,
  product: setCurrentTag
};

export const organizationForward = payload => {
  const { item, location, dispatch, page, navigate } = payload;

  if (item) {
    dispatch(reducerTypes[page](item.route));
    navigate(location.pathname + "/" + item.route);
  }
};

export const organizationBack = payload => {
  const { dispatch, navigate } = payload;
  dispatch(clearOrganizationState(["currentOrganization"]));
  navigate("/home");
};

export const productForward = payload => {
  const
    { item, location, dispatch, type, navigate } = payload,
    { key, tag } = combineByHyphen(item.endpoint, "api");

  if (type === pageTypes.product) {
    dispatch(reducerTypes[type]({ tag, pathTag: key, apiKey: item.endpoint }));
  }
  else if (type === pageTypes.developer) {
    dispatch(reducerTypes[type](item));
    dispatch(reducerTypes["product"]({ tag, pathTag: key, apiKey: item.endpoint }))
    navigate(location.pathname + "/" + key + "/" + item.method);
  }
};

export const productBack = payload => {
  const { dispatch, type, navigate, params } = payload;

  if (type === pageTypes.product) {
    const _location = `/organizations/${params.organizationId}`;
    dispatch(clearOrganizationState(["currentProduct"]));
    dispatch(clearDocumentation());
    navigate(_location);
  }
  else if (type === pageTypes.developer) {
    dispatch(clearOrganizationState(["currentTag"]))
  }
};

export const developerForward = payload => {
  const
    { item, dispatch, type, navigate, params } = payload,
    { key, tag } = combineByHyphen(item.endpoint, "api");

  if (type === pageTypes.product) {
    dispatch(reducerTypes[type]({ tag, pathTag: key, apiKey: item.endpoint }));
  }
  else if (type === pageTypes.developer) {
    dispatch(clearData(["requestResponse"]));
    dispatch(reducerTypes[type](item));
    dispatch(reducerTypes["product"]({ tag, pathTag: key, apiKey: item.endpoint }))
    if (params.endpointId !== key || params.methodId !== item.method) {
      const _location = `/organizations/${params.organizationId}/${params.applicationId}/${key}/${item.method}`;
      navigate(_location);
    }
  }
}

export const developerBack = payload => {
  const { dispatch, type, navigate, params } = payload;
  if (type === pageTypes.product) {
    dispatch(clearOrganizationState(["currentProduct"]));
    navigate(`/organizations/${params.organizationId}`);
  }
  else if (type === pageTypes.developer) {
    dispatch(clearOrganizationState(["currentTag"]));
  }
}