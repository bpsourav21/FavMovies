import React from "react";
import { Outlet } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";
import LoadingOverlay from "../components/LoadingOverlay";
import { useAppSelector } from "../hooks";


const Layout = () => {
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const alert = useAppSelector((state) => state.common.alert);
  return (
    <div className="mainWrapper">
      <Outlet />
      {isLoading && <LoadingOverlay />}
      {alert != null && <AlertComponent alert={alert} />}
    </div>
  );
};

export default Layout;
