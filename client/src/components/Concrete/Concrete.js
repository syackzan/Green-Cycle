import React from 'react';

import { Link } from 'react-router-dom';

function Concrete ({ project }){

    let list = [];
    let accu = 0;
    
    const concreteList = project.recycleItems.map(item => {
        if(item.material ==="Concrete"){
            list.push(item);
        }
    })

    for (let i = 0; i < list.length; i++){    

        let number = parseInt(list[i].quantity)
        accu = accu + number;
    }

    if(!list[0]){
        return (
            <div className="colorC">
            <div className="colorC d-flex justify-content-center recycleType2 fullBorder">Concrete</div>
            <div className="printList">
                <p className="centerText"><b>No Recycled Material!</b></p>
            </div>
        </div>
        )
    }

    return (
        <div className="">
            <div className="colorC fullBorder">
                <div className="d-flex justify-content-center">
                    <p className="recycleType2 m-0">Concrete</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p className="recycleType2 m-0">Total: {accu} CY</p>
                </div>
            </div>
            {list.map((item) => (
                <div className="printList" key={item._id}>
                    <div className="centerText2"><b>Notes:</b> {item.notes}</div>
                    <div className="d-flex justify-content-around p-1 colorC">
                        <div><p className="m-0 textW"><b>Quanitity:</b> {item.quantity} LF </p></div>
                        <div><p className="m-0 textW"><b>| Date:</b> {item.date}</p></div>
                        <div><Link className="noStyle styleItemLink" to={`/item/${project._id}/${item._id}`}>Edit</Link></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Concrete;