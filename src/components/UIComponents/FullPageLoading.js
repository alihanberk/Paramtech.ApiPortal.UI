import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBrandVisible } from "store/features/app";
import { useNavigate, useParams } from "react-router-dom";
import { clearOrganizationState } from "store/features/organization";
import { upperCaseFirstLetter } from "lib/helpers";

const FullPageLoading = () => {
  const
    [brandVisible, environment] = useSelector(({ app }) => [app.appSlice.brandVisible, app.appSlice.environment]),
    navigate = useNavigate(),
    params = useParams(),
    dispatch = useDispatch();

  useEffect(() => {
    if (brandVisible)
      setTimeout(() => {
        dispatch(setBrandVisible(false));
        if (params.applicationId) {
          dispatch(clearOrganizationState(["currentTag", "currentEndpoint"]));
          navigate(`/organizations/${params.organizationId}/${params.applicationId}`)
        }
      }, 1500)
  }, [brandVisible]);

  return (
    <div className={`fadeOut ${brandVisible ? "out" : ""}`}>
      <span>{environment.toUpperCase()} ortamına geçiş yapılıyor.</span>
    </div>
  )
}

export default FullPageLoading;