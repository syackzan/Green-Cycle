import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

import { GET_SINGLE_ITEM } from '../../utils/queries';
import { UPDATE_ITEM } from '../../utils/mutations';
import { DELETE_ITEM }  from '../../utils/mutations';

function Item (){

    let background;
    
    const { itemId } = useParams();
    console.log(itemId);
    
    // const [deleteItem, { error }] = useMutation(DELETE_ITEM)
    const [updateItem, { error }] = useMutation(UPDATE_ITEM)

    const { loading, data } = useQuery(GET_SINGLE_ITEM, {
        variables: { id: itemId}
    });

    const item = data?.item || `fail`;

    // onClick={() => toggleVisible()}

    if(item.material === "Wood"){
        background = "colorW";
    } else if (item.material ==="Concrete"){
        background = "colorC"
    } else {
        background = "ColorS"
    }

    const [formState, setFormState] = useState ({
        material: item.material,
        quantity: item.quantity,
        unit: item.unit,
        notes: item.notes,
        recycler: item.recycler,
    })

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(formState.material === "Select"){
            alert("Must select a material");
            return;
        }

        // Wrap in an if statement that confirms all the input values were entered correctly
        if(formState.material && formState.quantity && formState.unit && formState.notes && formState.recycler){
            try {
                const { data } = await updateItem({
                    variables: {...formState, id: item._id},
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
const [display, setDisplay] = useState('t');
const toggleVisible = async (event) => {
    event.preventDefault();
    if (!display){
        await setDisplay('t')
    } else {
        await setDisplay('')
    }
}

    return (
        <div className="jumbotron m-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="contractorCard">
                            <div className={`mainItemBorder p-1 ${background} textW`}>
                                <div>
                                    <h2 className="bottomBorder">Material: {item.material}</h2>
                                    <p className="m-0"><b>Created: {item.date} </b></p>
                                    <p className="m-0"><b>Item Id#: {item._id} </b></p>
                                    <p className="m-0"><b>Notes</b> {item.notes}</p>
                                    <p className="m-0"><b>Quantity:</b> {item.quantity} {item.unit}</p>
                                    <p className="m-0"><b>Recycler:</b> {item.recycler}</p>
                                </div>
                                <div className="d-flex justify-content-end p-2">
                                    <button className="styleItemLink" onClick={() => toggleVisible}>Edit Material</button>
                                </div>
                            </div>
                            <div className={display ? ("displayYes row m-0 align-items-center thickBorder styleLogin m-1") : ("displayNo")}>
                                <Form.Group className="d-flex justify-content-center m-1">
                                    <Form.Label className="loginHeader">Edit Item Info Above</Form.Label>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;