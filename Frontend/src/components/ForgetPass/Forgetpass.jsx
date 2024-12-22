import React, { useState, useEffect, useContext } from 'react';
import './ForgetPass.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify'
const LoginPopup = ({ setForgetpass }) => {

  const { url } = useContext(StoreContext);

  const [step, setStep] = useState(1); // Step control: 1 for email, 2 for OTP, 3 for creating password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newpassword, setnewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(300);
  const [LoaderF, setLoaderF] = useState(false);

  useEffect(() => {
    let countdown;
    if (step === 2 && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      setForgetpass(false); 
    }
    return () => clearInterval(countdown);
  }, [step, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleSendOtp = async () => {
    if (email) {
      try {
        setLoaderF(true);
        const response = await axios.post(`${url}/api/forget/otpsend`, { email });
        if (response.data.success) {
          setLoaderF(false);
          toast.success('Otp sent successfully');
          setStep(2);
        } else {
          toast.error(response.data.message);
          setLoaderF(false)
        }
      } catch (error) {

        toast.error('An error occurred while sending the OTP.');
      }
    } else {
      toast.error('Please enter your email');
      setLoaderF(false)
    }
  };

  const handleVerifyOtp = async () => {
    if (otp) {
      try {
        if (timer === 0) {
          setForgetpass(false)
          window.location.reload();
        }

        const response = await axios.post(`${url}/api/forget/verifyotp`, { email, otp });
        if (response.data.success) {
          setStep(3);
        } else {
          toast.error('Please Enter correct OTP');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      }
    } else {
      toast.error('Please enter your OTP');
    }
  };

  const handleCreatePassword = async () => {
    if (newpassword && confirmPassword) {
      if (newpassword === confirmPassword) {
        try {
          const response = await axios.post(`${url}/api/forget/resetpassword`, { email, newpassword });

          if (response.data.success) {
            toast.success('Password Reset successfully');
            setForgetpass(false);
          }
        } catch (error) {

          alert('Error');
        }

      } else {
        toast.error('Passwords do not match');
      }
    } else {
      alert('Please fill in both password fields');
    }
  };

  return (
    <div className='Forget-Popup'>
      <div className="forget-popup-container">
        {step === 1 && (
          <div className='step'>
            <div>
              <h3>Forget Password</h3>
              <img onClick={() => setForgetpass(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
            {LoaderF ? <Loader /> : <></>}
          </div>
        )}

        {step === 2 && (
          <div className='step'>
            <div>
              <h3>Verify OTP</h3>
              <img onClick={() => setForgetpass(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <input
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <p>Time remaining: {formatTime(timer)}</p>
            <button onClick={handleVerifyOtp}>Verify</button>
          </div>
        )}

        {step === 3 && (
          <div className='step'>
            <div>
              <h3>Create New Password</h3>
              <img onClick={() => setForgetpass(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <input
              type='password'
              placeholder='Enter new password'
              value={newpassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleCreatePassword}>Create</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
