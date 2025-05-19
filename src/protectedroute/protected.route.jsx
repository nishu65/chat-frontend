// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
 
  const isAuthenticated = useSelector((state) => state.user);
  
  const navigate = useNavigate();

  return isAuthenticated?children:navigate("/login");
};

export default ProtectedRoute;
