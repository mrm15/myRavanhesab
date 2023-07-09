import React from "react";
import { useAuth } from "./auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const auth = useAuth();

  if (!auth.login) {
    return (window.location.href = "https://userpanel.varkan.ir/login/?fromRh");
  }
  return children;
};

export default RequireAuth;
