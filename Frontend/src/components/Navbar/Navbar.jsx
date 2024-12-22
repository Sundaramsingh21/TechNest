import React, { Profiler, useContext } from 'react'
import './Navbar.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setmenu] = useState("Home")

    const { getTotalCartAmount, Token, setToken } = useContext(StoreContext)

    const navigate = useNavigate();

    const Logout= ()=>{
        localStorage.removeItem("Token");
        setToken("");
        navigate("/");
        window.location.reload();
    }
    return (
        <div className='navbar'>
            <Link to="/"><img className="logo" src={assets.logo} alt="" /></Link>
            {/* <Link to="/"><div className="logo">AS-India</div></Link> */}
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => { setmenu("Home") }} className={menu === "Home" ? "active" : ""}>Home</Link>
                <Link to='/myorders' onClick={() => { setmenu("Menu") }} className={menu === "Menu" ? "active" : ""}>Orders</Link>
                <a href='#footer' onClick={() => { setmenu("Contact us") }} className={menu === "Contact us" ? "active" : ""}>Contact us</a>
                <a href='#footer' onClick={() => { setmenu("About") }} className={menu === "About" ? "active" : ""}>About</a>
            </ul>
            <div className="navbar-right">
                
                <div className="navbar-search-icon">
                    {/* <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> */}
                    <Link to='/cart'>
                        <lord-icon 
                            src="https://cdn.lordicon.com/pbrgppbb.json"
                            trigger="hover"
                            colors="primary:#49557e"
                            >
                        </lord-icon>
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

                </div>
                {!Token?<button onClick={() => setShowLogin(true)}>Sign in</button> : <div className='navbar-Profile'>
                    <img className='profile' src={assets.profile_icon} alt="" />
                    <ul className="nav-profile-dropdown">
                        <Link to='/myorders'><li><img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
                        <hr />
                        <li onClick={Logout} ><img src={assets.logout_icon} alt="" />Logout</li>
                    </ul>
                </div>}

            </div>

        </div>
    )
}

export default Navbar
