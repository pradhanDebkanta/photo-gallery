import React from 'react';
import noresult1 from '../../assert/oppsB.svg';
import './NoResult.css';


const ErrorPage = (props) => {
    // console.log(props, 'from props')
    return (
        <div className="empty-classroom-container" data-theme={props.theme ? "light" : "dark"}>
            <div className="d-flex justify-content-center">
                <div className="row empty-classroom-body">
                    <div className="col-sm-6 image-container">
                        <img src={noresult1} alt="search a img" className="img-fluid" />
                    </div>
                    <div className="col-sm-6 content-box">
                        <p className="content-text">
                            Opps!! There is something wrong . <br/> Please check your internet or try after some times.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
