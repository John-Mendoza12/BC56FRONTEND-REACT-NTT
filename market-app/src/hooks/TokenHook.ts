import { useState } from "react";
import { IToken } from "../interfaces/IAuth";
import { useNavigate } from "react-router-dom";

export const TokenHook=()=>{
    const navigate = useNavigate();

    const Token_key='AuthToken';
    const getToken=()=>{
        return window.localStorage.getItem(Token_key)
    }
    const [isLogged, setIsLogged] = useState<boolean>(!!getToken())
    

   const  setToken=(token:string) =>{
        window.localStorage.removeItem(Token_key);
        window.localStorage.setItem(Token_key,token) 
        setIsLogged(true)  
    } 
  const logOut=()=> {
    window.localStorage.clear(); 
    navigate('/login');  
    setIsLogged(false) 
  }
  const getUserData=()=>  {
    if (!isLogged) {
      return null;
    }
    const token =getToken()!;
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values:IToken = JSON.parse(payloadDecoded);
    return values;
  
  }
return {setToken,logOut,isLogged,getUserData}
}