import React from 'react';
import Auth from '../../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_CONTRACTOR } from '../../utils/queries';

import  ProjectList  from '../ProjectList/ProjectList';
import CreateNewProject from '../CreateNewProject/CreateNewProject';
import Analytics from '../Analytics/Analytics'; 

function Dashboard (){
    
    const { contractorId } = useParams();
    console.log(contractorId);

    const { loading, data } = useQuery (GET_SINGLE_CONTRACTOR, {
        variables: { id: contractorId },
    });

    const contractor = data?.contractor || [];
    console.log(contractor);

    if(loading) {
        return <div>Loading...</div>
    }
    
    return (
        <div className="jumbotron m-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="contractorCard mainBorder">
                                    <div className="cCardHeader p-1">
                                        <h2>{contractor.companyName}</h2>
                                        <p>{contractor.address}, {contractor.city}, {contractor.state} {contractor.zip}</p>
                                    </div>
                                    <div className="cCardHeader d-flex">
                                        <ProjectList contractor={contractor} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <CreateNewProject />
                        </div>
                        <div className="row">
                            <Analytics />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;