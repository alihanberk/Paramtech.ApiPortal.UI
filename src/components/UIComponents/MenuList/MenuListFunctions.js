
import { pageTypes } from "lib/contants";
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
  const { item, location, dispatch, type, navigate, options } = payload;

  if (type === pageTypes.product) {
    dispatch(reducerTypes[type](item.name));
  }
  else if (type === pageTypes.developer && options.currentTag) {
    dispatch(reducerTypes[type](item))
    navigate(location.pathname + "/" + options.currentTag);
  }
};

export const productBack = payload => {
  const { dispatch, type, navigate, params } = payload;

  if (type === pageTypes.product) {
    const _location = `/organizations/${params.organizationId}`;
    dispatch(clearOrganizationState(["currentProduct"]))
    navigate(_location);
  }
  else if (type === pageTypes.developer) {
    dispatch(clearOrganizationState(["currentTag"]))
  }
};

export const developerForward = payload => {
  const { item, dispatch, type, navigate, options, params } = payload;

  if (type === pageTypes.product) {
    dispatch(reducerTypes[type](item.name));
  }
  else if (type === pageTypes.developer) {
    dispatch(reducerTypes[type](item));
    if (params.endpointId !== options.currentTag) {
      const _location = `/organizations/${params.organizationId}/${params.applicationId}/${options.currentTag}`;
      navigate(_location);
    }
  }
}

export const developerBack = payload => {
  const { dispatch, type, navigate, params } = payload;
  if(type === pageTypes.product){
    dispatch(clearOrganizationState(["currentProduct"]));
    navigate(`/organizations/${params.organizationId}`);
  }
  else if(type === pageTypes.developer){
    dispatch(clearOrganizationState(["currentTag", "currentEndpoint"]));
  }
}