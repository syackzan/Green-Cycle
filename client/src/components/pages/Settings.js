import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'

import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMPANY } from '../../utils/mutations';
import { useParams } from 'react-router-dom';

import { GET_SINGLE_CONTRACTOR } from '../../utils/queries';
import { UPDATE_COMPANY} from '../../utils/mutations';



function Settings() {


    const { contractorId } = useParams();

    const [formState, setFormState] = useState({
        companyName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
    })

    const { loading, data } = useQuery(GET_SINGLE_CONTRACTOR, {
        variables: {id: contractorId},
    });

    const contractor = data?.contractor || 'fail';

    const [updateContractor, { error }] = useMutation(UPDATE_COMPANY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await updateContractor({
                variables: {...formState, id: contractorId},
            }) 

            window.location.reload();

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

    const [display, setDisplay] = useState('');
    const toggleVisible = async (event) => {
        
        if (!display) {
            await setDisplay('t')
        } else {
            await setDisplay('')
        }

        setFormState({
            companyName: contractor.companyName,
            email: contractor.email,
            address: contractor.address,
            city: contractor.city,
            state: contractor.state,
            zip: contractor.zip,
            phoneNumber: contractor.phoneNumber,
        })
    }

    const toggleVisibleForm = async (event) => {
        event.preventDefault();
        if (!display) {
            await setDisplay('t')
        } else {
            await setDisplay('')
        }
    }

    const backItUp = () => {
        window.location.assign(`/dashboard/${contractorId}`);
    }

    return (
        <div className="jumbotron flex-fill">
            <div className="container-fluid">
                <div className="row p-4">
                    <div className="col-md-12 topMargin" >
                        <div className="d-flex justify-content-center align-items-center sizingSignUp boxShadow">
                            <div>
                                <div className={!display ? (`mainItemBorder p-1 brownC textW`) : ("displayNo")}>
                                    <div>
                                        <div className="d-flex justify-content-between bottomBorder">
                                            <div className="marginRight"><h2 className="m-0">Company: {contractor.companyName}</h2></div>
                                        </div>
                                        <p className="m-0"><b>Email: {contractor.email} </b></p>
                                        <p className="m-0"><b>Address: </b> {contractor.address}</p>
                                        <p className="m-0"><b>City: </b> {contractor.city}</p>
                                        <p className="m-0"><b>State: </b> {contractor.state}</p>
                                        <p className="m-0"><b>Zip: </b> {contractor.zip}</p>
                                        <p className="m-0"><b>Number: </b> {contractor.phoneNumber}</p>
                                    </div>
                                    <div className="d-flex justify-content-end p-2">
                                        <div className="m-1"><button className="styleItemLink" onClick={() => toggleVisible()}>Edit</button></div>
                                        <div className="m-1"><button className="styleItemLink" onClick={() => backItUp()}>Back</button></div>
                                    </div>
                                </div>
                            </div>
                            <div className={display ? (`displayYes d-flex align-items-center boxShadow styleLogin`) : ("displayNo")}>
                                <Form className="flex-fill" >
                                    <Form.Group className="d-flex justify-content-center">
                                        <Form.Label className="loginHeader">Edit Info Below!</Form.Label>
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
                                                    type="text"
                                                    placeholder="Enter Phone Number..."
                                                    name="phoneNumber"
                                                    value={formState.phoneNumber}
                                                    onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Group>
                                    </Form.Group>
                                    <div className="d-flex align-items-end justify-content-between m-1">
                                        <div>
                                            <button className="fitContent submitBtn" onClick={handleFormSubmit}>
                                                Submit
                                            </button>
                                        </div>
                                        <div>
                                            <button className="styleItemLink" onClick={() => toggleVisibleForm()}>
                                                Return
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;