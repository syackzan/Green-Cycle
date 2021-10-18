import React from 'react';
import Auth from '../../utils/auth';

function Dashboard (){
    
    const contractor = Auth.getContractor();
    console.log(contractor);
    
    return (
        <p>Dashboard</p>
    )
}

export default Dashboard;