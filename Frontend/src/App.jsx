import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import MyOrders from './pages/myOrders/myOrders'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ForgetPass from './components/ForgetPass/Forgetpass'
import CompInfo from './components/CompInfo/CompInfo'

const App = () => {

  const [ShowLogin, setShowLogin] = useState(false)
  const [Forgetpass, setForgetpass] = useState(false)
  const [searchquery, setsearchquery] = useState('')

  // document.addEventListener("contextmenu", function (event) {
  //   event.preventDefault();
  // });
  return (
    <>
      <ToastContainer />
      {ShowLogin ? <LoginPopup setShowLogin={setShowLogin} setForgetpass={setForgetpass} /> : <></>}
      {Forgetpass ? <ForgetPass setForgetpass={setForgetpass} /> : <></>}
      <Navbar setShowLogin={setShowLogin} setsearchquery={setsearchquery} searchquery={searchquery} className='Main-navbar' />
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home searchquery={searchquery} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/Order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/CompInfo/:id' element={<CompInfo />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
