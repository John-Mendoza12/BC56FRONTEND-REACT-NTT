import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/login/login"
import { LoginRouter } from "./loginRouter"
import { PrivateRouter } from "./privateRouter"
import { DashBOARD } from "../pages/dashboard/dashboard"


export const ContentRouter=()=>{
    return(
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={
         <LoginRouter>
          <Login/>
         </LoginRouter> 
        } />
        <Route path="/dashboard" element={
          <PrivateRouter>
            <DashBOARD />
          </PrivateRouter>
        } />
       
      </Routes>
    </BrowserRouter>
    )

}