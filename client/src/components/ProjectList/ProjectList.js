import React from 'react';
import { Link } from 'react-router-dom';

import AmountC from '../Amounts/AmountC';
import AmountS from '../Amounts/AmountS';
import AmountW from '../Amounts/AmountW';

function ProjectList ({contractor}) {
    
    return (
        <div className="d-flex flex-wrap projectCardsBackground">
            {contractor.projects.map((project) => (
            <div key={project._id} className="individualProjectCard flex-fill">
                <div>
                    <div className="aTop">
                        <h4 className="m-0">{project.name}</h4>
                    </div>
                    <div className="d-flex aMiddle">
                        <div className="d-flex align-items-center p-1">
                            <p className="m-0"><b>Location:</b></p> 
                        </div>
                        <div className="d-flex flex-column paddingLeft borderLeft">
                            <p className="m-0">{project.address}</p>
                            <p className="m-0">{project.city}, {project.state}, {project.zip}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center aMiddle recycleTitleColor">
                        <b><p className="m-0">--- RECYCLING TOTALS ---</p></b>
                    </div>
                    <div className="row d-flex aMiddle m-0">
                        <div className="d-flex align-items-center p-1 colorC col-4">
                            <p className="m-0 recycleType">Concrete:</p> 
                        </div>
                        <div className="d-flex align-items-center borderLeft col-8">
                            <AmountC project={project}/>
                        </div>
                    </div>
                    <div className="row d-flex aMiddle m-0">
                        <div className="d-flex align-items-center p-1 colorW col-4">
                            <p className="m-0 recycleType">Wood:</p> 
                        </div>
                        <div className="d-flex align-items-center borderLeft col-8">
                            <AmountW project={project}/>
                        </div>
                    </div>
                    <div className="row d-flex aMiddle m-0">
                        <div className="d-flex align-items-center p-1 colorS col-4">
                            <p className="m-0 recycleType">Steel</p> 
                        </div>
                        <div className="d-flex align-items-center borderLeft col-8">
                            <AmountS project={project}/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center viewProjectBtn">
                        <Link className="noStyle" to={`/project/${project._id}`}>
                        <button className="viewProjectBtn">Click Here To See Details</button>
                        </Link>
                    </div>
                </div>
            </div>  
            ))}
        </div>
    )
}

export default ProjectList;