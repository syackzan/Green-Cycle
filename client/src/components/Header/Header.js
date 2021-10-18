import React from 'react';
import logo from '../../assets/images/logo1.png'
import { Link } from 'react-router-dom';

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
                    <Link className="navStyle" to='/signup'>Sign Up</Link>
                    </li>
                    <li className='nav-item'>
                    <Link className="navStyle" to='/'>Login</Link>
                    </li>
                    <li className='nav-item'>
                    <Link className="navStyle" to='/aboutus'>About Us</Link>
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