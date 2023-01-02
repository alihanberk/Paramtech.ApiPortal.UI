import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from "store/features/app";
import { useNavigate, useParams } from "react-router-dom";
import { clearOrganizationState } from "store/features/organization";
import Logo from "../../assets/img/param-preloader.gif";
import Typography from "./Typography";

const FullPageLoading = ({ message }) => {
  const
    brandVisible = useSelector(({ app }) => app.appSlice.brandVisible),
    navigate = useNavigate(),
    params = useParams(),
    dispatch = useDispatch();

  useEffect(() => {
    if (brandVisible)
      setTimeout(() => {
        dispatch(setAppState({ key: "brandVisible", data: false }));
        if (params.organizationId) {
          dispatch(clearOrganizationState(["currentTag", "currentEndpoint", "currentProduct"]));
          navigate(`/organizations/${params.organizationId}`)
        }
      }, 2000)
  }, [brandVisible]);

  return (
    <div className={`fadeOut flex-col ${brandVisible ? "out" : ""}`}>
      <img className="mb-32" src={Logo} alt="loading" />
      <Typography.P className="shine" >{message}</Typography.P>
    </div>
  )
}

export default FullPageLoading;