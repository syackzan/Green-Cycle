import React from 'react';

import dumpt from '../../assets/images/dumpt.png';

function AboutUs() {
    return (
        <div className ="jumbotron">
            <div className="container-fluid ">
                <div className="row m-3 sizingAboutUs boxShadow d-flex flex-wrap">
                    <div className="col-6 fakeWidth"></div>
                    <div className="col-6 d-flex flex-column">
                        <div className="row flex-fill align-items-end"><h2 className="bigFont">
                            <u>ABOUT US</u></h2>
                        </div>
                        <div className="row textW flex-fill "><p className="mediumFon">Bulk Description</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;