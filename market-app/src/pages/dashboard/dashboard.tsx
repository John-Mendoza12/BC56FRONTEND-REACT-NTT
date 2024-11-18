import { useState } from "react"
import { Footer } from "../../components/Footer/footer"
import { NavBar } from "../../components/NavBar/navBar"
import { ShopProvider } from "../../context/shopListContext"
import { Products } from "../products/products"
import { Sumary } from "../sumary/sumary"

export const DashBOARD=()=>{
    const [checkSta,setCheckSta]=useState(false)
    return (
      <>
      
     <ShopProvider>
      <NavBar setCheckSta={setCheckSta}></NavBar>
      {checkSta ?(
          <Sumary setCheckSta={setCheckSta}></Sumary>
      ):(
        <Products></Products>
      )}
      <Footer></Footer>
      </ShopProvider>
  
      </>
    )
}