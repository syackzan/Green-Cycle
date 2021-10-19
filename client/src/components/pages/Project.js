import React, { useState } from 'react';
import { GET_SINGLE_PROJECT } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import Concrete from '../Concrete/Concrete';
import Wood from '../Wood/Wood';
import Steel from '../Steel/Steel';


function Project() {

    const [display, setDisplay] = useState('');

    const toggleVisible = async (event) => {

        if (!display){
            await setDisplay('t')
        } else {
            await setDisplay('')
        }
    }

    const { projectId } = useParams();
    console.log(projectId);

    const { loading, data } = useQuery(GET_SINGLE_PROJECT, {
        variables: { id: projectId },
    });

    console.log(data);
    const project = data?.project || [];

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
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Project Name..."
                                            name="name"
                                            value="{formState.name}"
                                            onChange="{handleChange}"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label>Quantity:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Residential, Commercial..."
                                            name="type"
                                            value="{formState.type}"
                                            onChange="{handleChange}" />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label>Unit:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="8000 ..."
                                            name="squareFootage"
                                            value="{formState.squareFootage}"
                                            onChange="{handleChange}" />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label>Recycler:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Street Name..."
                                            name="address"
                                            value="{formState.address}"
                                            onChange="{handleChange}" />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label>Notes:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter City..."
                                            name="city"
                                            value="{formState.city}"
                                            onChange="{handleChange}" />
                                    </Form.Group>
                                    <button onClick="{handleFormSubmit}">
                                        Submit
                                    </button>
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