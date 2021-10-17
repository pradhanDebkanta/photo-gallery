import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Image from './Image';
import './ImageList.css';
import Modal from 'react-modal'

const ImageList = ({ image, total_results, theme, nextPage, total_pages }) => {
    const [clickImage, setClickImage] = useState(null);
    const [isZoom, setIsZoom] = useState(false);
    const [position, setPosition] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [pageNo, setPageNo] = useState(1);

    const refImg = useRef();
    const observer = useRef();

    const breakpointColumnsObj = {
        default: 3,
        1200: 3,
        990: 2,
        700: 1,
    };

    useLayoutEffect(() => {
        const newSize = () => {
            if (refImg.current) {
                let dimension = refImg.current.getBoundingClientRect();
                setPosition({
                    left: dimension.right - 70,
                });
            }
        };
        newSize();
        window.addEventListener('resize', newSize);
        return () => window.removeEventListener('resize', newSize);
    }, [isZoom, clickImage])

    useEffect(() => {
        if (image) {
            if (image.length > 0) {
                setIsLoading(false);
            }
        }

        if (total_pages >= pageNo) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }

    }, [image, total_results, total_pages])

    const lastImageElementRef = useCallback(node => {
        if (isLoading) return;
        // console.log(node, 'from node');

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            // console.log('hiii', entries);
            if (entries[0].isIntersecting && hasMore) {
                // console.log('intersect');
                setPageNo((prevPageNo) => prevPageNo + 1);
                nextPage();
            }
        }, { threshold: 0.1, rootMargin: '0px' });
        if (node) observer.current.observe(node);
        // console.log(observer, 'from observer');

    }, [isLoading, hasMore]);

    // this is render one one Image component for each and every image 
    const images = image.map((imageItem, idx) => {
        if (image.length === idx + 1) {
            return (
                <Image item={imageItem} handleClick={setClickImage} key={imageItem.id} ref={lastImageElementRef} />
            );
        } else {
            return (
                <Image item={imageItem} handleClick={setClickImage} key={imageItem.id} />
            );
        }

    });

    Modal.setAppElement('#root');

    return (
        <div className="image-box" data-theme={theme ? "light" : "dark"}>
            <Modal
                isOpen={clickImage ? true : false}
                onRequestClose={() => setClickImage(null)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }
                }}
            >
                <div className="icon-box" onClick={() => setClickImage(null)}>
                    <i className="fas fa-times icon"></i>
                </div>

                <div className="body-img">
                    <div className="body-img-box">
                        <div className="zoom-icon-box" style={{ left: position.left }}>
                            {
                                isZoom ?
                                    <i className="fas fa-compress-alt zoom-icon" onClick={() => setIsZoom(!isZoom)}></i>
                                    :
                                    <i className="fas fa-expand-alt zoom-icon" onClick={() => setIsZoom(!isZoom)}></i>
                            }
                        </div>
                        {
                            clickImage ?
                                isZoom ?
                                    <img src={clickImage.regular} alt='img' className="img-fluid d-flex justify-content-center clicked-img"
                                        onClick={() => setIsZoom(!isZoom)}
                                        style={{ cursor: 'zoom-out' }}
                                        ref={refImg}
                                    />
                                    :
                                    <img src={clickImage.small} alt='img' className="img-fluid d-flex justify-content-center clicked-img"
                                        style={{ cursor: 'zoom-in' }}
                                        onClick={() => setIsZoom(!isZoom)}
                                        ref={refImg}
                                    />
                                : <></>

                        }

                    </div>
                </div>

            </Modal>

            <div className="img-container">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {/* array of JSX items */}
                    {
                        image.length ? images : <></>
                    }
                </Masonry>

            </div>
            {
                total_pages < pageNo ? <h5 className="scroll-end">No more results...</h5> : <></>
            }
        </div>
    );
};

export default ImageList;