import React from 'react';
import noresult1 from '../../assert/opps.svg';
import noresult2 from '../../assert/oppsB.svg';
import noresult3 from '../../assert/empty.svg';
import noresult4 from '../../assert/empty1.svg';
import noresult5 from '../../assert/empty2.svg';
import './NoResult.css';


const NoResult = (props) => {
    const svgArr = [noresult1, noresult2,noresult3,noresult4,noresult5];
    const randSvg = () => {
        return svgArr[Math.floor(Math.random() * svgArr.length)];
    }
    return (
        <div className="empty-classroom-container">
            <div className="d-flex justify-content-center">
                <div className="row empty-classroom-body">
                    <div className="col-sm-6 image-container">
                        <img src={randSvg()} alt="search a img" className="img-fluid" />
                    </div>
                    <div className="col-sm-6 content-box">
                        <p className="content-text">
                            Opps!! There is no image on "<span className="highlight">{props.term}</span>". <br/> Please search another term.
                            Search any high resolution image by click on search button.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NoResult
