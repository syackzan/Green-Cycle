import React from 'react';

function AmountC ({ project }){

    let accumulator = 0;

    project.recycleItems.map((item) => {
        if (item.material === "Concrete"){
            accumulator = accumulator + item.quantity;
        }
    })

    return(
        <p className="m-0 recycleAmount">{accumulator} CY</p>
    )
}

export default AmountC;