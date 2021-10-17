import React from 'react';

function Header () {
    return (
        <header className="headerStyle">
            <div className="pushHeader">
                <h1 className="textDarker">Scotty Yackzan</h1>
                <p className='text'>Built With React</p>
            </div>
            <div className="pushNav">
            <ul className="nav nav-tabs">
                <li className='nav-item'>
                    <a href="#a" >About</a>
                </li>
                <li className='nav-item'>
                    <a href="#b">Portfolio</a>
                </li>
                <li className='nav-item'>
                    <a href="#c">Resume</a>
                </li>
                <li className='nav-item'>
                    <a href="#d">Contact</a>
                </li>
            </ul>
            </div>
        </header>
    )
}

export default Header;