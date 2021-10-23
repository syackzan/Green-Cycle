import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations'

function CreateNewProject() {
    
    const [formState, setFormState] = useState({
        name: '',
        type: '',
        squareFootage: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        owner: ''
    });

    const [addProject, { error }] = useMutation(ADD_PROJECT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addProject({
                variables: {...formState},
              })

              setFormState({
                name: '',
                type: '',
                squareFootage: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                owner: ''
            })
              
              window.location.reload();
              
        } catch(e){
            console.log(e);
        }

    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        if (name ==="name"){
            setFormState({...formState, name: value})
        }

        if (name ==="type"){
            setFormState({...formState, type: value})
        }

        if (name ==="squareFootage"){
            setFormState({...formState, squareFootage: parseInt(value)})
        }

        if (name ==="address"){
            setFormState({...formState, address: value})
        }

        if (name ==="city"){
            setFormState({...formState, city: value})
        }

        if (name ==="state"){
            setFormState({...formState, state: value})
        }

        if (name ==="zip"){
            setFormState({...formState, zip: value})
        }

        if (name ==="owner"){
            setFormState({...formState, owner: value})
        }
        
    }
    
    return (
        <div className="d-flex align-items-center boxShadow styleLogin m-1">
            <Form className="flex-fill" >
                <Form.Group className="d-flex justify-content-center">
                    <Form.Label className="loginHeader">Enter New Project Info Below</Form.Label>
                </Form.Group>
                <Form.Text className="text-muted d-flex justify-content-center">
                    Every item is required.
                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Project Name..."
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                    /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Type:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Residential, Commercial..."
                        name="type"
                        value={formState.type}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Square Footage:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="8000 ..."
                        name="squareFootage"
                        value={formState.squareFootage}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Street Name..."
                        name="address"
                        value={formState.address}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter City..."
                        name="city"
                        value={formState.city}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>State:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a State (CA, FL)..."
                        name="state"
                        value={formState.state}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Zip:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter a Zip..."
                        name="zip"
                        value={formState.zip}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Owner:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Owner of Project..."
                        name="owner"
                        value={formState.owner}
                        onChange={handleChange} />
                </Form.Group>
                <button className="standardBtn" onClick={handleFormSubmit}>
                    Submit
                </button>
            </Form>
        </div>
    )
}

export default CreateNewProject;