import React from 'react';
import gsearch from '../../assert/gsearch.svg';
import msearch from '../../assert/msearch.svg';
import fsearch from '../../assert/fsearch.svg';
import './NoResult.css';

const SearchAImg = (props) => {
    const svgArr = [gsearch, fsearch, msearch];
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
                            Searching any high resolution image of <span className="highlight">{props.term}</span>. Please wait.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SearchAImg
