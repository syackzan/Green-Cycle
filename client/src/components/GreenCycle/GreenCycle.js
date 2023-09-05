import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { Button, Modal } from 'react-bootstrap';

// Importing Components & Pages
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AboutUs from '../pages/AboutUs';
import Dashboard from '../pages/Dashboard';
import Project from '../pages/Project'
import Item from '../pages/Item';
import Settings from '../pages/Settings';

function GreenCycle() {

  const [show, setShow] = useState(false);
  const [demo, setDemo] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseAndLogin = () => {
    setDemo(true);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  return (
    <div>
      <Header handleShow={handleShow} />
      <Route exact path="/">
        <Login demo={demo} setDemo={setDemo}/>
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
      <Route exact path="/project/:projectId">
        <Project />
      </Route>
      <Route exact path="/item/:projectId/:itemId">
        <Item />
      </Route>
      <Route exact path="/settings/:contractorId">
        <Settings />
      </Route>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to demo the website?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Username: websiteDemo@demo.com</p>
          <p>Password: construction123</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleCloseAndLogin}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default GreenCycle;