import React from 'react';
import Auth from '../../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_CONTRACTOR } from '../../utils/queries';

function Dashboard (){
    
    const { contractorId } = useParams();
    console.log(contractorId);

    const { loading, data } = useQuery (GET_SINGLE_CONTRACTOR, {
        variables: { id: contractorId },
    });

    const contractor = data?.contractor || [];
    console.log(contractor);
    
    return (
        <p>Dashboard</p>
    )
}

export default Dashboard;