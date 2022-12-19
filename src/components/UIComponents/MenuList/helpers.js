import { clearData } from "store/features/app";
import { setCurrentEndpoint, setCurrentTag } from "store/features/organization";

export const productNavigate = ({ currentTag, item, dispatch, navigate, location }) => {
  if (currentTag) {
    if (item)
      dispatch(setCurrentEndpoint(item))
    navigate(location)
  }
  else {
    dispatch(setCurrentTag(item.name));
    dispatch(clearData([
      { key: "headerParams", initialState: [] },
      { key: "parameters", initialState: [] },
      { key: "drawerVisible", initialState: false },
      { key: "body", initialState: null },
      { key: "responseContent", initialState: null }
    ]
    ));
  }
};