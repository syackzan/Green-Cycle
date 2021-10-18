import React from 'react';


function Footer () {
    return (
        <div className="footer">
            <ul className="nav nav-tabs">
                <li className='footer-links'>
                    <a className='navStyle' href="about">License</a>
                </li>
                <li className='footer-links'>
                    <a className='navStyle' href="portfolio">Built With @ React</a>
                </li>
                <li className='footer-links'>
                    <a className='navStyle' href="resume">Other</a>
                </li>
            </ul>
        </div>
    )
}

export default Footer;