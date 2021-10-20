import React from 'react';

function Steel ({ project }){

    let list = [];
    let accu = 0;
    
    const steelList = project.recycleItems.map(item => {
        if(item.material === "Steel"){
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
            <div className="colorS d-flex justify-content-center recycleType2 fullBorder">Steel</div>
            <div className="printList">
                <p className="centerText"><b>No Recycled Material!</b></p>
            </div>
        </div>
        )
    }

    return (
        <div className="">
            <div className="colorS fullBorder">
                <div className="d-flex justify-content-center">
                    <p className="recycleType2 m-0">Steel</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p className="recycleType2 m-0">Total: {accu} #</p>
                </div>
            </div>
            {list.map((item) => (
                <div className="printList" key={item._id}>
                    <div className="centerText2"><b>Notes:</b> {item.notes}</div>
                    <div className="d-flex justify-content-between p-1 colorS">
                        <p className="m-0 textW"><b>Quanitity:</b> {item.quantity} #</p>
                        <p className="m-0 textW"><b>| Date:</b> {item.date}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Steel;