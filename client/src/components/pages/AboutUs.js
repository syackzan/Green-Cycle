import React from 'react';

import dumpt from '../../assets/images/dumpt.png';

function AboutUs() {
    return (
        <div className ="jumbotron">
            <div className="container-fluid">
                <div className="row m-3 sizingAboutUs boxShadow d-flex flex-wrap">
                    <div className="col-md-6 fakeWidth"></div>
                    <div className="col-md-6 d-flex flex-column">
                        <div className="row flex-fill">
                            <div className="d-flex align-items-end headerAboutUs p-0">
                                <h2 className="bigFont boxShadow p-2">
                                <u>ABOUT US</u>
                                </h2>
                            </div>
                            <div className="textW flex-fill boxShadow mediumFont">
                                <p className="mediumFont p-2">
                                    The U.S. alone contributions an esteemed 251 Million tons of consumer waste annually, but less than a third is recycled or composted. 
                                    As much as 40% of this waste comes from Construction Projects, which produce a surplus of unused building materials. 
                                    This is where the Green Cycle application comes into play - to track all the unused building material waste - either through demo or new Construction. 
                                    We want to tap into that market and make it a priority for these Contractors to recycle by making it a competition. 
                                    With the World moving more and more towards Green Energy and Recycling Tactics, we believe now is an opportune time to start tracking waste and making sure it’s recycled.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;