import React, { useState } from 'react';
import logo from '../../assets/images/logo1.png'
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Header({ handleShow }) {

    let urlId;

    const logout = (event) => {
        //event.preventDefault();
        Auth.logout();
    }

    // <button onClick={() => logout()}>Button</button>

    const [sidenavDisplay, setSideNavDisplay] = useState('');

    const showSideNav = () => setSideNavDisplay('t');
    const closeSideNav = () => setSideNavDisplay('');

    return (
        <header className="headerStyle">
            <div className="pushHeader">
                <h1 className="textDarker">Green Cycle</h1>
                <p className='text textDisplay'>Saving Earth's Resources one project at a time.</p>
            </div>
            <div className="d-flex justify-content-center">
                <img className="logo" src={logo} alt="Green Cycle Logo" />
            </div>
            <div className="pushNav webDisplay">
                <ul className="nav nav-tabs">
                    {Auth.loggedIn() ? (
                    <>
                        <li className='nav-item'>
                        <Link className="navStyle" to={`/dashboard/${Auth.getContractor().data._id}`}>Dashboard</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to="#" onClick={async () => await logout()}>Logout</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/aboutus'>About Us</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to={`/settings/${Auth.getContractor().data._id}`}>⚙️</Link>
                        </li>
                    </>
                    ) : (
                    <>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/signup'>Sign Up</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/'>Login</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="navStyle" to='/' onClick={handleShow}>Demo</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/aboutus'>About Us</Link>
                        </li>
                    </>
                    )}
                </ul>   
            </div>
            <div className="phoneDisplay pushNavButton">
                <button onClick={showSideNav}>☰</button>
            </div>
            <div className={sidenavDisplay ? ("sidenav displayYes") : ("displayNo")}>
                <div className="d-flex justify-content-end m-1">
                    <button className="standardBtn" onClick={closeSideNav}>x</button>
                </div>
                <ul className="nav nav-tabs">
                    {Auth.loggedIn() ? (
                        <>
                            <li className='sidenav-item'>
                            <Link className="sidenavStyle" to={`/dashboard/${Auth.getContractor().data._id}`} onClick={closeSideNav}>Dashboard</Link>
                            </li>
                            <li className='sidenav-item'>
                            <Link className="sidenavStyle" to="#" onClick={async () => await logout()}>Logout</Link>
                            </li>
                            <li className='sidenav-item'>
                            <Link className="sidenavStyle" to='/aboutus' onClick={closeSideNav}>About Us</Link>
                            </li>
                            <li className='sidenav-item'>
                            <Link className="sidenavStyle" to={`/settings/${Auth.getContractor().data._id}`} onClick={closeSideNav}>Settings</Link>
                            </li>
                        </>
                        ) : (
                        <>
                            <li className='sidenav-item'>
                            <Link className="sidenavStyle" to='/signup' onClick={closeSideNav}>Sign Up</Link>
                            </li>
                            <li className='sidenav-item'>
                            <Link className="sidenavStyle" to='/' onClick={closeSideNav}>Login</Link>
                            </li>
                            <li className='sidenav-item'>
                            <Link className="sidenavStyle" to='/' onClick={closeSideNav}>Demo</Link>
                            </li>
                            <li className='sidenav-item'>
                            <Link className="sidenavStyle" to='/aboutus' onClick={closeSideNav}>About Us</Link>
                            </li>
                        </>
                        )}
                </ul>
            </div>
        </header >
    )
}

export default Header;