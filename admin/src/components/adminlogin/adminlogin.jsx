import React, { useEffect, useState } from 'react'
import './adminlogin.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
const adminlogin = ({ setShowLogin, setToken, url}) => {

    const [LoaderS, setLoaderS] = useState(false)

    const [Data, setData] = useState({
        email: "",
        password: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(Data => ({ ...Data, [name]: value }))
        
    }

    const onLogin = async (event) =>{
        event.preventDefault()
        setLoaderS(true)
        const loginUrl = `${url}/api/admin/login`
        const response = await axios.post(loginUrl,Data);
        if (response.data.success) {
            //In backend token name is define and here we using Token as state varible to store token.
            setToken(response.data.token);
            localStorage.setItem("adminToken",response.data.token)
            setShowLogin(false)
            setLoaderS(false)
            window.location.reload();
            
        }
        else{
            setLoaderS(false)
            alert(response.data.message)
            Data.email="";
            Data.password="";
            
            
        }
    }
    const loadData = async () => {
        const token = localStorage.getItem("adminToken");
        if (token) {
          setToken(token);
          setShowLogin(false);
        }
      };
      
      
    useEffect(() => {
      loadData()
    }, [setToken])
    


    return (
        <div className='Login-Popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>Admin Login</h2>
                    
                </div>
                <div className="login-popup-inputs">

                    <input name='email' onChange={onChangeHandler} value={Data.email} type="email" placeholder='Your email' required />

                    <input name='password' onChange={onChangeHandler} value={Data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit' >Login</button>
                {LoaderS?<Loader/>:<></>}
                <div className="login-popup-condition">

                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

            </form>

        </div>
    )
}

export default adminlogin
