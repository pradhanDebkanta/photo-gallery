import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import Image from './Image';
import './ImageList.css';
import Modal from 'react-modal'

const ImageList = (props) => {
    const [clickImage, setClickImage] = useState(null);
    const breakpointColumnsObj = {
        default: 3,
        1200: 3,
        990: 2,
        700: 1,
        // 575:1
    };

    const images = props.image.map((imageItem) => {
        return (
            <Image item={imageItem} key={imageItem.id} handleClick={setClickImage} />
        );
    });
    console.log(clickImage, 'from feedback')

    const noImages = () => {
        return (
            <div className="no-image">
                <h3 className='header'>OPPS! No results found</h3>
            </div>
        );
    }
    // console.log(props.image, 'from check')
    Modal.setAppElement('#root');
    return (
        <div className="image-box" data-theme={props.theme ? "light" : "dark"}>
            <Modal
                isOpen={clickImage ? true : false}
                onRequestClose={() => setClickImage(null)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.6)'
                    }
                }}
            >
                <div className="icon-box" onClick={() => setClickImage(null)}>

                    <i className="fas fa-times icon"></i>
                </div>
                <div className="body-img">
                    <img src={clickImage} alt='img' className="img-fluid d-flex justify-content-center" />
                </div>

                {/* <div className="modal-container container">
                    <div className="header-box">
                        <i className="fas fa-times" onClick={() => setClickImage(null)}></i>
                    </div>
                    <div className="body-container">
                        <img src={clickImage} alt='img' className="img-fluid d-flex justify-content-center" />
                    </div>
                </div> */}

            </Modal>

            <div className="img-container">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {/* array of JSX items */}
                    {
                        props.image.length ? images : <></>
                    }
                </Masonry>
                {
                    !props.image.length ? noImages() : <></>
                }
            </div>
        </div>
    );
};

export default ImageList;