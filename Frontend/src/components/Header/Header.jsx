import React from 'react'
import './Header.css'

const Header = () => {

    return (
        <div>
            <marquee scrollamount="8" behavior="scroll" direction="left">Buy project's and electronic component's at the lowest cost at TechNest Electronic. Indias fastest growing B2C brand for electronic components.</marquee>
            <div className='header'>
                <div className="header-contents">
                    <h3>Order Projects and Electronic items here</h3>
                    <p>We offer a wide variety of <span>Projects</span>, designed to inspire creativity and meet diverse needs.</p>
                    <a href='#explore-menu'>Explore</a>
                </div>
            </div>
        </div>
    )
}

export default Header
