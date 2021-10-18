import React from 'react';
import { Route } from 'react-router-dom';

// Importing Components & Pages
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AboutUs from '../pages/AboutUs';
import Dashboard from '../pages/Dashboard';

function GreenCycle () {
    return (
        <div className="">
          <Header />
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/aboutus">
            <AboutUs />
          </Route>
          <Route exact path="/dashboard/:contractorId">
            <Dashboard />
          </Route>
          <Footer />
        </div>
    )
}

export default GreenCycle;