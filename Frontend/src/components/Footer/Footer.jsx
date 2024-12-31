import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">

                    <img className="logo" src={assets.logo} alt="" />

                    <p>TechNest is trusted by 500+ happy customers. we Provide all types of enginnerig projects here and electonic components in cheapest price than others. </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                {/* <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div> */}
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 9175702325</li>
                        <li>+91 8080636502</li>
                        <li>Technestelectronic@gmail.com</li>
                      
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2025 © TechNest - All rights reserved.
            </p>

        </div>
    )
}

export default Footer
