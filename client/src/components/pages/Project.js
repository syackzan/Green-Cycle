import React, { useState } from 'react';
import { GET_SINGLE_PROJECT } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import { ADD_ITEM } from '../../utils/mutations'

import Concrete from '../Concrete/Concrete';
import Wood from '../Wood/Wood';
import Steel from '../Steel/Steel';


function Project() {

    //Form Input Functionality
    const [formState, setFormState] = useState ({
        material: '',
        quantity: '',
        unit: '',
        notes: '',
        recycler: '',
    })

    // Grabbing Mutation
    const [addItem, { error }] = useMutation(ADD_ITEM);
    
    //Handling Request to Database to Add Item
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(formState.material === "Select"){
            alert("Must select a material");
            return;
        }

        // Wrap in an if statement that confirms all the input values were entered correctly
        if(formState.material && formState.quantity && formState.unit && formState.notes && formState.recycler){
            try {
                const { data } = await addItem({
                    variables: {...formState, id: project._id},
                  })
                  
                
                  window.location.reload();
                  
            } catch(e){
                console.log(e);
            }
    
            setFormState({
                material: '',
                quantity: '',
                unit: '',
                notes: '',
                recycler: '',
            })
        } else {
            alert("Add Item Not Filled Out Correctly");
            return
        }
    }

    // Handling Input Form Data Change
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        if (name ==="material"){
            setFormState({...formState, material: value})
        }

        if (name ==="quantity"){
            setFormState({...formState, quantity: parseInt(value)})
        }

        if (name ==="unit"){
            setFormState({...formState, unit: value})
        }

        if (name ==="notes"){
            setFormState({...formState, notes: value})
        }

        if (name ==="recycler"){
            setFormState({...formState, recycler: value})
        }
        
    }


    //Toggling between show and off Funcitonality for Add Item Form
    const [display, setDisplay] = useState('');
    const toggleVisible = async (event) => {

        if (!display){
            await setDisplay('t')
        } else {
            await setDisplay('')
        }
    }

    //Grabbing Params
    const { projectId } = useParams();
    

    //Query Items for a Single Project
    const { loading, data } = useQuery(GET_SINGLE_PROJECT, {
        variables: { id: projectId },
    });
    const project = data?.project || [];
    

    //Waiting Text if still Loading
    if (loading) {
        return <div>Project Data Loading...</div>
    }

    return (

        <div className="jumbotron m-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="contractorCard">
                            <div className="cCardHeader d-flex p-1 justify-content-between">
                                <div>
                                    <h2>{project.name}</h2>
                                    <p className="m-0"><b>Location: </b>{project.address}, {project.city}, {project.state} {project.zip}</p>
                                    <p className="m-0"><b>Type:</b> {project.type}</p>
                                    <p className="m-0"><b>Size:</b> {project.squareFootage}sf</p>
                                    <p className="m-0"><b>Owner:</b> {project.owner}</p>
                                </div>
                                <div className="p-2">
                                    <button onClick={() => toggleVisible()}>Add New Item</button>
                                </div>
                            </div>
                            <div className={display ? ("displayYes row m-0 align-items-center thickBorder styleLogin") : ("displayNo")}>
                                <Form.Group className="d-flex justify-content-center m-1">
                                    <Form.Label className="loginHeader">Enter New Item</Form.Label>
                                </Form.Group>
                                <Form className=" d-flex flex-fill flex-wrap" >
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicEmail">
                                        <Form.Label>Material:</Form.Label>
                                        <Form.Select name="material" value={formState.material} onChange={handleChange}>
                                            <option>Select</option>
                                            <option value="Concrete">Concrete</option>
                                            <option value="Wood">Wood</option>
                                            <option value="Steel">Steel</option> 
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label>Quantity:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Quantity"
                                            name="quantity"
                                            value={formState.quantity}
                                            onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label>Unit:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Unit Type..."
                                            name="unit"
                                            value={formState.unit}
                                            onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label>Notes:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Short Description..."
                                            name="notes"
                                            value={formState.notes}
                                            onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label>Recycler:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Recycling Company..."
                                            name="recycler"
                                            value={formState.recycler}
                                            onChange={handleChange} />
                                    </Form.Group>
                                    <div className="d-flex align-items-end m-1">
                                        <button className="fitContent" onClick={handleFormSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </div>
                            <div className="d-flex row m-0">
                                <div className="col-4 itemListBorder m-0 p-0">
                                    <Concrete project={project} />
                                </div>
                                <div className="col-4 itemListBorder m-0 p-0">
                                    <Wood project={project} />
                                </div>
                                <div className="col-4 itemListBorder m-0 p-0">
                                    <Steel project={project} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Project;