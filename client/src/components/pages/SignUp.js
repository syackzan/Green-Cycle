import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'

import { useMutation } from '@apollo/client';
import { ADD_COMPANY } from '../../utils/mutations';



function SignUp() {

    const [formState, setFormState] = useState({
        companyName: '',
        email: '',
        password: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
    })

    const [addContractor, { error }] = useMutation(ADD_COMPANY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(formState);
        try {
            const { data } = await addContractor({
                variables: {...formState},
            }) 
            console.log(data);

            setFormState({
                companyName: '',
                email: '',
                password: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                phoneNumber: '',
            })

            alert("Succes. You will now be directed to main page to Login")

            window.location.assign('/')

        } catch (e) {
            console.log(e);
        }

        
    }

    function handleChange(event){
        event.preventDefault();
        const { name, value} = event.target

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    return (
        <div className="jumbotron flex-fill">
            <div className="">
                <div className="row p-4">
                    <div className="col-md-12 topMargin" >
                        <div className="d-flex justify-content-center align-items-center sizingLogin boxShadow">
                            <div className="d-flex align-items-center boxShadow styleLogin">
                                <Form className="flex-fill" >
                                    <Form.Group className="d-flex justify-content-center">
                                        <Form.Label className="loginHeader">Sign Up Below!</Form.Label>
                                    </Form.Group>
                                    <Form.Group className="d-flex flex-wrap">
                                        <Form.Group className="m-2 flex-fill">
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Company Name..."
                                                    name="companyName"
                                                    value={formState.companyName}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email: </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter Email..."
                                                    name="email"
                                                    value={formState.email}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password: </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter Password..."
                                                    name="password"
                                                    value={formState.password}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Group>
                                        <Form.Group className="m-2 flex-fill">
                                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                                <Form.Label>Address:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Address"
                                                    name="address"
                                                    value={formState.address}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicCity">
                                                <Form.Label>City:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter City..."
                                                    name="city"
                                                    value={formState.city}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicState">
                                                <Form.Label>State: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter State..."
                                                    name="state"
                                                    value={formState.state}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicZip">
                                                <Form.Label>Zip: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Zip..."
                                                    name="zip"
                                                    value={formState.zip}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                                <Form.Label>Phone Number: </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Phone Number..."
                                                    name="phoneNumber"
                                                    value={formState.phoneNumber}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Group>
                                    </Form.Group>
                                    <button onClick={handleFormSubmit}>
                                        Submit
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;