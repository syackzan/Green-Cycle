import React from 'react';
import logo from '../../assets/images/logo1.png'

function Header () {
    return (
        <header className="headerStyle">
            <div className="pushHeader">
                <h1 className="textDarker">Green Cycle</h1>
                <p className='text textDisplay'>Saving Earth's Resources one cycle at a time.</p>
            </div>
            <div className="d-flex justify-content-center">
                <img className="logo" src={logo} alt="Green Cycle Logo" />
            </div>
            <div className="pushNav webDisplay">
                <ul className="nav nav-tabs">
                    <li className='nav-item'>
                        <a href="#a" className="navStyle">Sign-In</a>
                    </li>
                    <li className='nav-item'>
                        <a href="#b" className="navStyle">Login</a>
                    </li>
                    <li className='nav-item'>
                        <a href="#c" className="navStyle">About Us</a>
                    </li>
                </ul>   
            </div>
            <div className="phoneDisplay pushNavButton">
                <button>☰</button>
            </div>
        </header>
    )
}

export default Header;