
import { useState } from 'react'
import './App.css'
import { Footer } from './components/Footer/footer'
import { NavBar } from './components/NavBar/navBar'
import { Products } from './pages/products/products'
import { Sumary } from './pages/sumary/sumary'
import { ShopProvider } from './context/shopProvider'


function App() {
  
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

export default App
