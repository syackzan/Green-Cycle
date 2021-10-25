import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

import { GET_SINGLE_ITEM } from '../../utils/queries';
import { UPDATE_ITEM } from '../../utils/mutations';
import { DELETE_ITEM } from '../../utils/mutations';

function Item() {

    let background;

    const { itemId } = useParams();
    const { projectId } = useParams();

    
    const [deleteItem, { error }] = useMutation(DELETE_ITEM)
    const [updateItem, { e }] = useMutation(UPDATE_ITEM)

    const { loading, data } = useQuery(GET_SINGLE_ITEM, {
        variables: { id: itemId }
    });

    const item = data?.item || `fail`;

    if (item.material === "Wood") {
        background = "colorW";
    } else if (item.material === "Concrete") {
        background = "colorC"
    } else if (item.material === "Steel") {
        background = "colorS"
    } else {
        background = "none";
    }

    const [formState, setFormState] = useState({
        material: '',
        quantity: '',
        unit: '',
        notes: '',
        recycler: '',
    })

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (formState.material === "Select") {
            alert("Must select a material");
            return;
        }

        // Wrap in an if statement that confirms all the input values were entered correctly
        if (formState.material && formState.quantity && formState.unit && formState.notes && formState.recycler) {
            try {
                const { data } = await updateItem({
                    variables: { ...formState, id: item._id },
                })


                window.location.reload();

            } catch (e) {
                console.log(e);
            }
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

    const handleDeleteItem = async (event) => {
        event.preventDefault();

        try {
            const { data } = await deleteItem({
                variables: { id: itemId, id2: projectId},
            })

            window.location.assign(`/project/${projectId}`);
        } catch(e){
            console.log(e);
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

        setFormState({
            material: item.material,
            quantity: item.quantity,
            unit: item.unit,
            notes: item.notes,
            recycler: item.recycler,
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
        window.location.assign(`/project/${projectId}`);
    }

    return (
        <div className="jumbotron m-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="contractorCard">
                            <div className={!display ? (`mainItemBorder p-1 ${background} textW`) : ("displayNo")}>
                                <div>
                                    <div className="d-flex justify-content-between bottomBorder">
                                        <div><h2 className="m-0">Material: {item.material}</h2></div>
                                        <div><button className="styleItemLink" onClick={() => backItUp()}>Back</button></div>
                                    </div>
                                    <p className="m-0"><b>Created: {item.date} </b></p>
                                    <p className="m-0"><b>Item Id#: {item._id} </b></p>
                                    <p className="m-0"><b>Notes</b> {item.notes}</p>
                                    <p className="m-0"><b>Quantity:</b> {item.quantity} {item.unit}</p>
                                    <p className="m-0"><b>Recycler:</b> {item.recycler}</p>
                                </div>
                                <div className="d-flex justify-content-end p-2">
                                    <button className="styleItemLink" onClick={() => toggleVisible()}>Edit Material</button>
                                </div>
                            </div>
                            <div className={display ? (`displayYes row d-flex justify-content-center m-0 align-items-center blackBorder styleAddNewProject m-1 change123 ${background}`) : ("displayNo")}>
                                <Form.Group className="d-flex justify-content-center m-1">
                                    <Form.Label className="loginHeader textW">Edit Item Info Below</Form.Label>
                                </Form.Group>
                                <Form className="" >
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicEmail">
                                        <Form.Label className="textW">Material:</Form.Label>
                                        <Form.Select name="material" value={formState.material} onChange={handleChange}>
                                            <option>Select</option>
                                            <option value="Concrete">Concrete</option>
                                            <option value="Wood">Wood</option>
                                            <option value="Steel">Steel</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label className="textW">Quantity:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Quantity"
                                            name="quantity"
                                            value={formState.quantity}
                                            onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label className="textW">Unit:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Unit Type..."
                                            name="unit"
                                            value={formState.unit}
                                            onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label className="textW">Notes:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Short Description..."
                                            name="notes"
                                            value={formState.notes}
                                            onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 m-1 flex-fill" controlId="formBasicPassword">
                                        <Form.Label className="textW">Recycler:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Recycling Company..."
                                            name="recycler"
                                            value={formState.recycler}
                                            onChange={handleChange} />
                                    </Form.Group>
                                    <div className="d-flex align-items-end justify-content-between m-1">
                                        <div>
                                            <button className="fitContent submitBtn" onClick={handleFormSubmit}>
                                                Submit
                                            </button>
                                        </div>
                                        <div>
                                            <button className="standardBtn" onClick={() => toggleVisibleForm()}>
                                                Return
                                            </button>
                                        </div>
                                        <div>
                                            <button className="fitContent deleteBtn textW" onClick={handleDeleteItem}>
                                                Delete
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

export default Item;