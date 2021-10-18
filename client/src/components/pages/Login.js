import React from 'react';
import ContractorList from '../ContractorList/ContractorList'

import { useQuery } from '@apollo/client';

import { GET_ALL_CONTRACTORS } from '../../utils/queries';

function Login () {

    const { loading, data } = useQuery(GET_ALL_CONTRACTORS);
    const contractors = data?.contractors || [];
    console.log(data);
    console.log(contractors);
    

    return (
        <div className="jumbotron flex-fill">
            <div className="">
                <div className="row p-4">
                    <div className="col-md-4">
                        <div className="mainBorder">
                            <h1 className="centerText lowerBorder">Top Contractors</h1>
                            <ContractorList contractors={contractors}/>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="mainBorder">
                            <p>Goodbye</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;