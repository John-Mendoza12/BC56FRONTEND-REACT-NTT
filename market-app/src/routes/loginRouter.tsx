import { RouteProps, useNavigate } from "react-router-dom";
import { TokenHook } from "../hooks/TokenHook";
import { useEffect } from "react";

export const LoginRouter=({children}:RouteProps )=>{
  const { isLogged } = TokenHook();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }else{
      navigate('/dashboard');
    }
  }, [isLogged, navigate]);

  return children;
}