import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../context/AppProvider";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { userInfo } = useContext(AppContext);

  return userInfo?.token ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoutes;
