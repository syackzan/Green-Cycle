import React from 'react';
import { GET_SINGLE_PROJECT } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';


function Project (){

    const { projectId } = useParams();
    console.log(projectId);

    const { loading, data } = useQuery (GET_SINGLE_PROJECT, {
        variables: { id: projectId },
    });

    console.log(data);
    const project = data?.project || [];

    if(loading){
        return <div>Project Data Loading...</div>
    }

    return (

        <p>{project.name}</p>
    )
};

export default Project;