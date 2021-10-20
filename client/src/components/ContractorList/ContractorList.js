import React from 'react';
import { GET_SINGLE_CONTRACTOR } from '../../utils/queries';

function ContractorList ({ contractors }) {
    console.log(contractors);

    let concreteTotal = 0;
    let baseWood = 0;
    let baseSteel = 0;

    if (!contractors.length) {
        return <p>No Top List Yet</p>
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let count = 0;

    const plus = () => {
        count++
    }



    // contractors.map((contractor) => {
    //     contractor.projects.map((project) => {
    //         project.recycleItems.map((item) => {
    //             if (item.material === "Concrete"){
    //                 concreteTotal = concreteTotal + item.quantity;
    //             }
    //         })
    //     })
    // })

    console.log(concreteTotal);

    return (
        <div>
            {contractors.map((contractor) => (
                <div key={contractor._id} className="topListStyle">
                    <p className="topListFont">{numbers[count]}. {contractor.companyName}</p>
                    {plus()}
                </div>
            ))}
        </div>
    )
}

export default ContractorList;