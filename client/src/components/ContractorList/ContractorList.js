import React from 'react';

function ContractorList ({ contractors }) {
    console.log(contractors);

    if (!contractors.length) {
        return <p>No Top List Yet</p>
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let count = 0;

    const plus = () => {
        count++
    }

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