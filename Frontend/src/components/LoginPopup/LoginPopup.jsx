import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin, setForgetpass }) => {
    const { url, Token, setToken } = useContext(StoreContext);
    const [LoaderS, setLoaderS] = useState(false);
    const [OTP, setOTP] = useState(1)

    const [CurrentState, setCurrentState] = useState("Login");
    const [Data, setData] = useState({
        name: "",
        email: "",
        password: "",
        otp: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((Data) => ({ ...Data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        setLoaderS(true);


        let newUrl = url;
        if (CurrentState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, Data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("Token", response.data.token);
                setShowLogin(false);
                window.location.reload();
            } else {
                toast.error(response.data.message);
                Data.email = "";
                Data.password = "";
                Data.name = "";
                Data.otp = "";

            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            Data.email = "";
            Data.password = "";
            Data.name = "";
            Data.otp = "";
        } finally {
            setLoaderS(false);
        }
    };
    const forgetpassword = () => {
        setShowLogin(false)
        setForgetpass(true)
    }
    const otpSender = async () => {
        setLoaderS(true)
        if (Data.email) {
            const response = await axios.post(`${url}/api/user/otp`, { email: Data.email })
            if (response.data.success) {

                toast.success(response.data.message);
                setLoaderS(false)
                setOTP(2);
            }
        }
        else {
            toast.error(response.data.message);
            setLoaderS(false)
        }

    }

    return (
        <div className='Login-Popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{CurrentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {CurrentState === "Login" ? null : (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={Data.name}
                            type="text"
                            placeholder='Your name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={Data.email}
                        type="email"
                        placeholder='Your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={Data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                    {CurrentState === "Login" ? null : (
                        <div>
                            <p style={{ fontSize: '12px', marginBottom: '6px' }}>Please click on Send OTP to get OTP.</p>
                            <input
                                style={{ width: '100%' }}
                                name='otp'
                                onChange={onChangeHandler}
                                value={Data.otp}
                                type="text"
                                placeholder='Enter OTP'
                                required
                            />
                        </div>
                    )}

                </div>
                <div className='btn-forget'>
                    <button type='submit'>
                        {CurrentState === "Sign Up" ? OTP === 1 ? <button onClick={otpSender} className='OTPsender'> Send OTP</button> : "Create account" : "Login"}
                    </button>
                    {CurrentState === "Login" ? <p onClick={forgetpassword}>Forget password</p> : <></>}
                    {LoaderS ? <Loader /> : <></>}
                </div>



                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {CurrentState === "Sign Up" ? (
                    <p>
                        Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span>
                    </p>
                ) : (

                    <p>
                        Create a new account? <span onClick={() => setCurrentState("Sign Up")}>click here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
