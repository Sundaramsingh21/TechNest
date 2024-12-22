import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
const Navbar = ({setToken ,setShowLogin}) => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setShowLogin(true);
    navigate("/");
  };
  

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <div className='right'>
        <img className='profile' src={assets.profile_icon} alt="" />
        <img onClick={Logout} className='logout' src={assets.logout_icon} alt='' />
      </div>
    </div>
  )
}

export default Navbar
