import { RouteProps, useNavigate } from "react-router-dom";
import { TokenHook } from "../hooks/TokenHook";
import { useEffect } from "react";

export const PrivateRouter=({children}:RouteProps)=>{
    const { isLogged } = TokenHook();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (isLogged) {
        navigate('/dashboard');
      }else{
        navigate('/login');
      }
    }, [isLogged, navigate]);
  
    return children;
}