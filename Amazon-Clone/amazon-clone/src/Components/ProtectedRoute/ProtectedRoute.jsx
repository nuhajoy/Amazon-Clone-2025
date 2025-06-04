import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect = "/auth" }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Capture the current path before redirecting
  const { user } = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: {
          msg: msg || "Please sign in to continue.",
          redirect: location.pathname,
        },
      });
    }
  }, [user, navigate, redirect, msg, location.pathname]);

  return user ? children : null;
};

export default ProtectedRoute;
