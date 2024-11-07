import React  from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from 'react-router-dom'
import Adminlogin from './components/adminlogin/adminlogin'
import { useState } from 'react'

const App = () => {
  
  const url = "http://localhost:4000";
  const [ShowLogin, setShowLogin] = useState(true)
  const [Token, setToken] = useState("")
  return (
    <div>
      <ToastContainer/>
      {ShowLogin ? <Adminlogin setShowLogin={setShowLogin} url={url} setToken={setToken}/> :<></> }
      {Token?<Navbar setToken={setToken} setShowLogin={setShowLogin}/>:<></>}
      
      <div className="app-content">
        {Token?<Sidebar/>:<></>}
        {Token?<Routes>
            <Route path="/add" element={<Add url={url}/>}/>
            <Route path="/list" element={<List url={url}/>}/>
            <Route path="/orders" element={<Orders url={url}/>}/>
            

        </Routes>
      :<></>}
        
      </div>

    </div>
    
  )
}

export default App
