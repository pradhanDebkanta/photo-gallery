import React, { useRef, useEffect, createRef, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { useState } from 'react/cjs/react.development';

const Image = React.forwardRef(({ item, handleClick }, ref) => {
    const [isHoverC, setIsHoverC] = useState(false);
    const [isHoverS, setIsHoverS] = useState(false);
    const [isHoverCC, setIsHoverCC] = useState(false);
    const [isHoverD, setIsHoverD] = useState(false);
    const [position, setPosition] = useState({ x: null, y: null, });

    const slinkRef = createRef();
    const copyRef = createRef();
    const downloadRef = createRef();
    const copyClipRef = createRef();
    const hoveredIcon= useCallback((node)=>{
        console.log(node);
    },[isHoverC, isHoverCC, isHoverS, isHoverD])

    // const copyImg = async () => {
    //     const res = await fetch(item.urls.regular);
    //     const blob = await res.blob();
    //     const imgType = blob.type;
    //     await navigator.clipboard.write([new window.ClipboardItem({ [imgType]: blob })])
    //     console.log(res, 'from copy image', blob);
    //     console.log(window.ClipboardItem, 'from try')

    // }

    const shareImg = async () => {
        const shareData = {
            title: item.tags[0].title,
            text: item.alt_description,
            url: item.urls.regular
        };
        try {
            await navigator.share(shareData);

        } catch (err) {
            console.log('error: ', err);
        }
    }

    const downloadImg = () => {
        const imgSrc = item.urls.regular;
        const imgExt = '.png';
        saveAs(imgSrc, `${item.id}${imgExt}`);
    };

    const copyImg = () => {
        navigator.clipboard.writeText(item.urls.regular);
    };

    // useEffect(() => {
    //     if (isHoverC) {
    //         let cord = copyRef.current.getBoundingClientRect();
    //         console.log(copyRef.current, copyRef.current.getBoundingClientRect())
    //         setPosition((prevPos) => {
    //             return {
    //                 ...prevPos,
    //                 x: cord.x,
    //                 y: cord.y,
    //             }
    //         });
    //     }
    //     if (isHoverCC) {
    //         let cord = copyRef.current.getBoundingClientRect();
    //         console.log(copyRef.current, copyRef.current.getBoundingClientRect())
    //         setPosition((prevPos) => {
    //             return {
    //                 ...prevPos,
    //                 x: cord.x,
    //                 y: cord.y,
    //             }
    //         });
    //     }
    //     if (isHoverS) {
    //         let cord = copyRef.current.getBoundingClientRect();
    //         console.log(copyRef.current, copyRef.current.getBoundingClientRect())
    //         setPosition((prevPos) => {
    //             return {
    //                 ...prevPos,
    //                 x: cord.x,
    //                 y: cord.y,
    //             }
    //         });
    //     }
    //     if (isHoverD) {
    //         let cord = copyRef.current.getBoundingClientRect();
    //         console.log(copyRef.current, copyRef.current.getBoundingClientRect())
    //         setPosition((prevPos) => {
    //             return {
    //                 ...prevPos,
    //                 x: cord.x,
    //                 y: cord.y,
    //             }
    //         });
    //     }
    // }, [isHoverC, isHoverCC, isHoverS, isHoverD])
    // console.log(position)
    return (
        <div className="image" onDoubleClick={() => handleClick(item.urls)} ref={ref}>
            <div className="img">
                <img src={item.urls.regular} alt={item.alt_description} className="img-fluid" />
            </div>
            <div className="down-box">
                {/* copy link  */}
                <i className="fas fa-link" onClick={copyImg} ref={hoveredIcon}
                    onMouseOver={() => setIsHoverC(true)}
                    onMouseOut={() => setIsHoverC(false)}></i>

                {/* copy image to clipboard  */}
                <i className="far fa-save" ref={hoveredIcon}
                    onMouseOver={() => setIsHoverCC(true)}
                    onMouseOut={() => setIsHoverCC(false)}></i>

                {/* share image  */}
                <i className="far fa-share-square" onClick={shareImg} ref={hoveredIcon}
                    onMouseOver={() => setIsHoverS(true)}
                    onMouseOut={() => setIsHoverS(false)}></i>

                {/* download image  */}
                <i className="fas fa-download" onClick={downloadImg} ref={hoveredIcon}
                    onMouseOver={() => setIsHoverD(true)}
                    onMouseOut={() => setIsHoverD(false)}></i>

            </div>
        </div>
    )
});

export default Image;
