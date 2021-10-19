import React from 'react';
import { GET_SINGLE_PROJECT } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';


function Project() {

    const { projectId } = useParams();
    console.log(projectId);

    const { loading, data } = useQuery(GET_SINGLE_PROJECT, {
        variables: { id: projectId },
    });

    console.log(data);
    const project = data?.project || [];

    if (loading) {
        return <div>Project Data Loading...</div>
    }

    return (

        <div className="jumbotron m-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="contractorCard mainBorder">
                            <div className="cCardHeader d-flex p-1 justify-content-between">
                                <div>
                                    <h2>{project.name}</h2>
                                    <p className="m-0"><b>Location: </b>{project.address}, {project.city}, {project.state} {project.zip}</p>
                                    <p className="m-0"><b>Type:</b> {project.type}</p>
                                    <p className="m-0"><b>Size:</b> {project.squareFootage}sf</p>
                                    <p className="m-0"><b>Owner:</b> {project.owner}</p>
                                </div>
                                <div className="p-2">
                                    <button>Add New Item</button>
                                </div>
                            </div>
                            <div className="cCardHeader d-flex row m-0">
                                <div className="col-4 itemListBorder">Concrete</div>
                                <div className="col-4 itemListBorder">Wood</div>
                                <div className="col-4 itemListBorder">Steel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Project;