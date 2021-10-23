import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_CONTRACTOR } from '../../utils/queries';

import  ProjectList  from '../ProjectList/ProjectList';
import CreateNewProject from '../CreateNewProject/CreateNewProject';
import Analytics from '../Analytics/Analytics'; 

function Dashboard (){
    
    const [display, setDisplay] = useState('');

    const toggleVisible = async (event) => {

        if (!display){
            await setDisplay('t')
        } else {
            await setDisplay('')
        }
    }

    const { contractorId } = useParams();

    const { loading, data } = useQuery (GET_SINGLE_CONTRACTOR, {
        variables: { id: contractorId },
    });

    const contractor = data?.contractor || [];

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
                                <div className="contractorCard ">
                                    <div className="cCardHeader d-flex justify-content-between boxShadow">
                                        <div>
                                            <h2 className="textW">{contractor.companyName}</h2>
                                            <p className="textW">{contractor.address}, {contractor.city}, {contractor.state} {contractor.zip}</p>
                                        </div>
                                        <div className="p-2">
                                            <button className="standardBtn" onClick={() => toggleVisible()}>Add New Project</button>
                                        </div>
                                    </div>
                                    <div className="cCardBody d-flex boxShadow">
                                        <ProjectList contractor={contractor} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={display ? ("displayYes row") : ("displayNo")}>
                            <CreateNewProject />
                        </div>
                        <div className="row">
                            <Analytics contractor={contractor} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;