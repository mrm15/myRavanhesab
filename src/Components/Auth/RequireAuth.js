import React from 'react';
import {useAuth} from "./auth";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const RequireAuth = ({children}) => {

  const location = useLocation()
  const navigateTo = useNavigate()
  const auth = useAuth();
  
  if (!auth.user) {
    return <Navigate to={"/login"} state={{path: location.href || location.pathname}}/>
  }
  return children
};

export default RequireAuth;
