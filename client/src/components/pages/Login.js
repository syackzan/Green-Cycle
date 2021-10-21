import React, { useState } from 'react';
import ContractorList from '../ContractorList/ContractorList'
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";

import { useQuery, useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import { GET_ALL_CONTRACTORS } from '../../utils/queries';

import Auth from '../../utils/auth';

function Login() {

    const { loading, data } = useQuery(GET_ALL_CONTRACTORS);
    const contractors = data?.contractors || [];
    // console.log(data);
    console.log(contractors);

    const [formState, setFormState] = useState({email: '', password: ''});
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        })
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        //alert(e.target);

        try {

            const { data } = await login({
                variables: {...formState},
            });
            console.log(data);
            
            Auth.login(data.login.token);

        } catch (e) {
            console.error(e)
        }

        setFormState({
            email: '',
            password: '',
        });
    };


    return (
        <div className="jumbotron flex-fill">
            <div className="container-fluid">
                <div className="row p-4 d-flex smallScreen marginAuto">
                    <div className="col-md-4 topMargin">
                        <div className="boxShadow m-1 brownC">
                            <h1 className="topContractors lowerBorder textW">Top Contractors</h1>
                            <ContractorList contractors={contractors} />
                        </div>
                    </div>
                    <div className="col-md-8 topMargin" >
                       <div className="d-flex justify-content-center align-items-center sizingLogin boxShadow m-1">
                        <div className="d-flex align-items-center boxShadow styleLogin">
                                <Form className="flex-fill overflowt" >
                                    <Form.Group className="d-flex justify-content-center">
                                        <Form.Label className="loginHeader">Login Below!</Form.Label>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        placeholder="Enter email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange} 
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        name="password"
                                        value={formState.password}
                                        onChange={handleChange} />
                                    </Form.Group>
                                    <button onClick={handleFormSubmit}>
                                        Login
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

export default Login;