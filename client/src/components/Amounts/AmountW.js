import React from 'react';

function AmountW ({ project }){

    let accumulator = 0;

    project.recycleItems.map((item) => {
        if (item.material === "Wood"){
            accumulator = accumulator + item.quantity;
        }
    })

    return(
        <p className="m-0 recycleAmount">{accumulator} CF</p>
    )
}

export default AmountW;