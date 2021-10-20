import React from 'react';
import logo from '../../assets/images/logo1.png'
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Header () {
    
    let urlId;

    const logout = (event) => {
        //event.preventDefault();
        Auth.logout();
    }

    // try {
    //     let { data } = Auth.getContractor();
    //     let urlId = data._id
    // } catch (error){
    //     console.log(error);
    // }

    const storedToken = localStorage.getItem('token');
    if(storedToken){
        const { data } = Auth.getContractor();
        urlId = data._id;
    } else {
        urlId = "";
    }

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
                    {Auth.loggedIn() ? (
                        <>
                        <li className='nav-item'>
                        <Link className="navStyle" to={`/dashboard/${urlId}`}>Dashboard</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/' onClick={async () => await logout()}>Logout</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/aboutus'>About Us</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/settings'>⚙️</Link>
                        </li>
                        </>
                    // <button onClick={() => logout()}>Button</button>
                    ) : (
                    <>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/signup'>Sign Up</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/'>Login</Link>
                        </li>
                        <li className='nav-item'>
                        <Link className="navStyle" to='/aboutus'>About Us</Link>
                        </li>
                    </>
                    )}
                </ul>   
            </div>
            <div className="phoneDisplay pushNavButton">
                <button>☰</button>
            </div>
        </header>
    )
}

export default Header;