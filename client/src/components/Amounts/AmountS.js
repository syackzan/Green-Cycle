import React from 'react';

function AmountS ({ project }){

    let accumulator = 0;

    project.recycleItems.map((item) => {
        if (item.material === "Steel"){
            accumulator = accumulator + item.quantity;
        }
    })

    return(
        <p className="m-0 recycleAmount">{accumulator} #</p>
    )
}

export default AmountS;