import { ReactNode } from "react";

export interface IAuthBody{
    username:string,
    password:string,
    expiresInMins:number
}
export const initialAuth:IAuthBody={
    username: "",
    password: "",
    expiresInMins: 30
}
export interface ILogin{
    setLogin:React.Dispatch<React.SetStateAction<boolean>>

}
export interface RouteProps {
    children: ReactNode;
  }
export interface IToken {
    id:           number;
    username:     string;
    email:        string;
    firstName:    string;
    lastName:     string;
    gender:       string;
    image:        string;
}