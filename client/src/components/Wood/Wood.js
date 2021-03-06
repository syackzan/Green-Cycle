import React from 'react';

import { Link } from 'react-router-dom';

function Wood ({ project }){

    let list = [];
    let accu = 0;
    
    const woodList = project.recycleItems.map(item => {
        if(item.material === "Wood"){
            list.push(item);
        }
    })

    for (let i = 0; i < list.length; i++){    

        let number = parseInt(list[i].quantity)
        accu = accu + number;
    }

    if(!list[0]){
        return (
            <div className="">
            <div className="colorW d-flex justify-content-center recycleType2 fullBorder">Wood</div>
            <div className="printList">
                <p className="centerText"><b>No Recycled Material!</b></p>
            </div>
        </div>
        )
    }

    return (
        <div className="">
            <div className="colorW fullBorder">
                <div className="d-flex justify-content-center">
                    <p className="recycleType2 m-0">Wood</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p className="recycleType2 m-0">Total: {accu} LF</p>
                </div>
            </div>
            {list.map((item) => (
                <div className="printList" key={item._id}>
                    <div className="centerText2"><b>Notes:</b> {item.notes}</div>
                    <div className="d-flex justify-content-between p-1 colorW">
                        <div><p className="m-0 textW"><b>Quanitity:</b> {item.quantity} cf </p></div>
                        <div><p className="m-0 textW"><b>| Date:</b> {item.date}</p></div>
                        <div><Link className="noStyle styleItemLink" to={`/item/${project._id}/${item._id}`}>Details</Link></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Wood;