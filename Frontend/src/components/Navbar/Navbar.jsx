import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin, setsearchquery, searchquery }) => {
    const [menu, setmenu] = useState("Home")
    const [showSearch, setshowSearch] = useState(false)

    const { getTotalCartAmount, Token, setToken } = useContext(StoreContext)

    const navigate = useNavigate();

    const handlechange = (e) => {
        const query = e.target.value;
        setsearchquery(query)
    }
    const closesearch = () => {
        setsearchquery('')
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setshowSearch(false)
    }
    const Logout = () => {
        localStorage.removeItem("Token");
        setToken("");
        navigate("/");
        window.location.reload();
    }
    return (
        <div className='navbar'>
            <Link to="/"><img className="logo" src={assets.logo} alt="" /></Link>
            {showSearch ? <>
                <div className="search-icon-cross">
                    <input name='search' value={searchquery} onChange={handlechange} type="text" placeholder='Search' />
                    <p id='search-deasble-button' onClick={closesearch} >X</p>
                </div>
            </> :
                <ul className='navbar-menu'>
                    <Link to='/' onClick={() => { setmenu("Home") }} className={menu === "Home" ? "active" : ""}>Home</Link>
                    <Link to='/myorders' onClick={() => { setmenu("Menu") }} className={menu === "Menu" ? "active" : ""}>Orders</Link>
                    <a href='#footer' onClick={() => { setmenu("Contact us") }} className={menu === "Contact us" ? "active" : ""}>Contact us</a>
                    <a href='#footer' onClick={() => { setmenu("About") }} className={menu === "About" ? "active" : ""}>About</a>
                </ul>}

            <div className="navbar-right">
                {showSearch ? <></> : <img onClick={() => setshowSearch(true)} src={assets.search_icon} alt="" />}
                <div className="navbar-search-icon">

                    <Link to='/cart' onClick={()=>scrollTo(0,0) } >
                        <lord-icon
                            src="https://cdn.lordicon.com/pbrgppbb.json"
                            trigger="hover"
                            colors="primary:#49557e"
                        >
                        </lord-icon>
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

                </div>
                {!Token ? <button onClick={() => setShowLogin(true)}>Sign in</button> :
                    <div className='navbar-Profile'>
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
