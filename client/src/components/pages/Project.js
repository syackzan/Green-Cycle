import React, { useState } from 'react';
import { GET_SINGLE_PROJECT } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { ADD_ITEM } from '../../utils/mutations'

import Concrete from '../Concrete/Concrete';
import Wood from '../Wood/Wood';
import Steel from '../Steel/Steel';


function Project() {

    //Form Input Functionality
    const [formState, setFormState] = useState({
        material: '',
        quantity: '',
        unit: '',
        notes: '',
        recycler: '',
    })

    const [formState2, setFormState2] = useState({
        width: '',
        length: '',
        thickness: '',
        quantity: ''
    })

    const [total, setTotal] = useState(0);

    const [show, setShow] = useState('');

    // Grabbing Mutation
    const [addItem, { error }] = useMutation(ADD_ITEM);

    //Handling Request to Database to Add Item
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (formState.material === "Select") {
            alert("Must select a material");
            return;
        }

        // Wrap in an if statement that confirms all the input values were entered correctly
        if (formState.material && formState.quantity && formState.unit && formState.notes && formState.recycler) {
            try {
                const { data } = await addItem({
                    variables: { ...formState, id: project._id },
                })


                window.location.reload();

            } catch (e) {
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

        if (name === "material") {
            setFormState({ ...formState, material: value })
        }

        if (name === "quantity") {
            setFormState({ ...formState, quantity: parseInt(value) })
        }

        if (name === "unit") {
            setFormState({ ...formState, unit: value })
        }

        if (name === "notes") {
            setFormState({ ...formState, notes: value })
        }

        if (name === "recycler") {
            setFormState({ ...formState, recycler: value })
        }

    }

    const handleChange2 = (event) => {
        event.preventDefault();

        const { name, value } = event.target;

        if (name === "width") {
            setFormState2({ ...formState2, width: parseInt(value) })
        }

        if (name === "length") {
            setFormState2({ ...formState2, length: parseInt(value) })
        }

        if (name === "thickness") {
            setFormState2({ ...formState2, thickness: parseInt(value) })
        }

        if (name === "quantity") {
            setFormState2({ ...formState2, quantity: parseInt(value) })
        }
    }


    //Toggling between show and off Funcitonality for Add Item Form
    const [display, setDisplay] = useState('');
    const toggleVisible = async (event) => {

        if (!display) {
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
    console.log(project);

    //Waiting Text if still Loading
    if (loading) {
        return <div>Project Data Loading...</div>
    }

    // Handling Modal Functionality
    const handleClose = () => setShow('');

    const handleCloseAdd = () => {
        setShow('')

        

        if (formState.material === "Concrete"){
            setFormState({
                ...formState,
                unit: 'CY',
                quantity: total
            })
        }

        if (formState.material === "Wood"){
            setFormState({
                ...formState,
                unit: 'CF',
                quantity: total
            })
        }

        if (formState.material === "Steel"){
            setFormState({
                ...formState,
                unit: '#',
                quantity: total
            })
        }
    };

    const handleShow = (event) => {
        event.preventDefault();
        setShow('t')

        setFormState2({
            width: '',
            length: '',
            thickness: '',
            quantity: ''
        })
    };

    const addConcrete = (event) => {
        event.preventDefault();

        if (formState2.quantity === ''){
            setFormState2({
                ...formState2,
                quantity: 1,
            })
        }

        const totalAdd = ((formState2.length * formState2.width * (formState2.thickness/12) * formState2.quantity)/27);
        const temp = total;

        let finalTotal = totalAdd + temp
        finalTotal = Math.round(finalTotal)
        setTotal(finalTotal);

    }

    const addWood = (event) => {
        event.preventDefault();

        if (formState2.quantity === ''){
            setFormState2({
                ...formState2,
                quantity: 1,
            })
        }

        const totalAdd = formState2.length * (formState2.width/12) * (formState2.thickness/12) * formState2.quantity;
        const temp = total;

        let finalTotal = totalAdd + temp
        finalTotal = Math.round(finalTotal)
        setTotal(finalTotal);

    }

    const addSteel = (event) => {
        event.preventDefault();

        if (formState2.quantity === ''){
            setFormState2({
                ...formState2,
                quantity: 1,
            })
        }

        const totalAdd = formState2.length * (formState2.width) * (formState2.thickness) * formState2.quantity;
        const temp = total;

        let finalTotal = totalAdd + temp
        finalTotal = Math.round(finalTotal)
        setTotal(finalTotal);

    }

    const resetCalc = (event) => {
        event.preventDefault();

        setTotal('');
    }

    const renderCalculator = () => {
        if (formState.material === "Concrete") {
            return (
                <div>
                    <Form.Group className="d-flex justify-content-center m-1">
                            <Form.Label className="loginHeader">Total: {total} </Form.Label>
                    </Form.Group>
                    <Form className=" d-flex flex-fill flex-wrap" >
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicEmail">
                            <Form.Label>Width: </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter width in feet"
                                name="width"
                                value={formState2.width}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Length:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter length in feet"
                                name="length"
                                value={formState2.length}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Thickness:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter thickness in inches"
                                name="thickness"
                                value={formState2.thickness}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter # of Floors or Walls"
                                name="quantity"
                                value={formState2.quantity}
                                onChange={handleChange2} />
                        </Form.Group>
                        <button className="standardBtn" onClick={addConcrete}>
                            Accumulate
                        </button>
                        <button className="primary resetBtn standardBtn" onClick={resetCalc}>
                            Reset
                        </button>
                    </Form>
                </div>
            )
        } else if (formState.material === "Wood") {
            return (
                <div>
                    <Form.Group className="d-flex justify-content-center m-1">
                            <Form.Label className="loginHeader">Total: {total} </Form.Label>
                    </Form.Group>
                    <Form className=" d-flex flex-fill flex-wrap" >
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicEmail">
                            <Form.Label>Width: </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter width in inches"
                                name="width"
                                value={formState2.width}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Thickness:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter thickness in inches"
                                name="thickness"
                                value={formState2.thickness}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Length:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter length in feet"
                                name="length"
                                value={formState2.length}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter quantity of studs, beams or sheets"
                                name="quantity"
                                value={formState2.quantity}
                                onChange={handleChange2} />
                        </Form.Group>
                        <button className="standardBtn" onClick={addWood}>
                            Accumulate
                        </button>
                        <button className="primary resetBtn standardBtn" onClick={resetCalc}>
                            Reset
                        </button>
                    </Form>
                </div>
            )
        } else if (formState.material === "Steel") {
            return (
                <div>
                    <Form.Group className="d-flex justify-content-center m-1">
                            <Form.Label className="loginHeader">Total: {total} </Form.Label>
                    </Form.Group>
                    <Form className=" d-flex flex-fill flex-wrap" >
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicEmail">
                            <Form.Label>Depth: </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter wide Flange Index..."
                                name="width"
                                value={formState2.width}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Weight/ft</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter weight/ft..."
                                name="thickness"
                                value={formState2.thickness}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Length:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter length in feet"
                                name="length"
                                value={formState2.length}
                                onChange={handleChange2} />
                        </Form.Group>
                        <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter quantity of beams or columns..."
                                name="quantity"
                                value={formState2.quantity}
                                onChange={handleChange2} />
                        </Form.Group>
                        <button className="standardBtn" onClick={addSteel}>
                            Accumulate
                        </button>
                        <button className="primary resetBtn standardBtn" onClick={resetCalc}>
                            Reset
                        </button>
                    </Form>
                </div>
            )
        } else {
            return (
                <p>Material Not Selected</p>
            )
        }
    }

    return (

        <div className="jumbotron m-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="contractorCard">
                            <div className="cCardHeader d-flex p-1 justify-content-between">
                                <div>
                                    <h2 className="textW">{project.name}</h2>
                                    <p className="m-0 textW"><b>Location: </b>{project.address}, {project.city}, {project.state} {project.zip}</p>
                                    <p className="m-0 textW"><b>Type:</b> {project.type}</p>
                                    <p className="m-0 textW"><b>Size:</b> {project.squareFootage}sf</p>
                                    <p className="m-0 textW"><b>Owner:</b> {project.owner}</p>
                                </div>
                                <div className="p-2">
                                    <button className="standardBtn" onClick={() => toggleVisible()}>Add New Item</button>
                                </div>
                            </div>
                            <div className={display ? ("displayYes row m-0 align-items-center thickBorder styleAddNewProject") : ("displayNo")}>
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
                                        <button className="standardBtn" onClick={handleShow}>
                                            calculate
                                        </button>
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
                                        <button className="fitContent standardBtn" onClick={handleFormSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </div>
                            <div className="d-flex flex-wrap row m-0">
                                <div className="col-md-4 itemListBorder m-0 p-0">
                                    <Concrete project={project} />
                                </div>
                                <div className="col-md-4 itemListBorder m-0 p-0">
                                    <Wood project={project} />
                                </div>
                                <div className="col-md-4 itemListBorder m-0 p-0">
                                    <Steel project={project} />
                                </div>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Calculate The Amount of {formState.material}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {renderCalculator()}
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="standardBtn" onClick={handleClose}>
                                    Close
                                </button>
                                <button className="standardBtn" onClick={handleCloseAdd}>
                                    Finish
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Project;