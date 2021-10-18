import React, { useRef, useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import './ImageList.css';

const Image = React.forwardRef(({ item, handleClick }, ref) => {
    const [isHoverC, setIsHoverC] = useState(false);
    const [isHoverS, setIsHoverS] = useState(false);
    const [isHoverCC, setIsHoverCC] = useState(false);
    const [isHoverD, setIsHoverD] = useState(false);
    const [position, setPosition] = useState({ x: null, y: null, });
    const [hoverMsg, setHoverMsg] = useState('');

    const copyRef = useRef();
    const copyClipRef = useRef();
    const slinkRef = useRef();
    const downloadRef = useRef();

    /*const copyImg = async () => {
        const res = await fetch(item.urls.regular);
        const blob = await res.blob();
        const imgType = blob.type;
        await navigator.clipboard.write([new window.ClipboardItem({ [imgType]: blob })])
        console.log(res, 'from copy image', blob);
        console.log(window.ClipboardItem, 'from try')
    */

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

    useEffect(() => {
        if (!(setIsHoverC || setIsHoverCC || isHoverS || setIsHoverD)) return;
        if (isHoverC) {
            let cord = copyRef.current.getBoundingClientRect();
            setPosition((prevPos) => {
                return {
                    ...prevPos,
                    x: cord.x + 22,
                    y: cord.bottom + 14,
                }
            });
            setHoverMsg('copy image link');
        }
        if (isHoverCC) {
            let cord = copyClipRef.current.getBoundingClientRect();
            setPosition((prevPos) => {
                return {
                    ...prevPos,
                    x: cord.x + 22,
                    y: cord.bottom + 14,
                }
            });
            setHoverMsg('copy image to clipboard');
        }
        if (isHoverS) {
            let cord = slinkRef.current.getBoundingClientRect();
            setPosition((prevPos) => {
                return {
                    ...prevPos,
                    x: cord.x + 22,
                    y: cord.bottom + 14,
                }
            });
            setHoverMsg('share the image');
        }
        if (isHoverD) {
            let cord = downloadRef.current.getBoundingClientRect();
            setPosition((prevPos) => {
                return {
                    ...prevPos,
                    x: cord.x + 22,
                    y: cord.bottom + 14,
                }
            });
            setHoverMsg('download image');
        }
    }, [isHoverC, isHoverCC, isHoverS, isHoverD])
    // console.log(position)
    return (
        <>
            <div className="image" onDoubleClick={() => handleClick(item.urls)} ref={ref}>
                <div className="img">
                    <img src={item.urls.regular} alt={item.alt_description} className="img-fluid" />
                </div>
                <div className="down-box">
                    {/* copy link  */}
                    <i className="fas fa-link" onClick={copyImg} ref={copyRef}
                        onMouseOver={() => {
                            setIsHoverC(true);
                        }}
                        onMouseOut={() => {
                            setIsHoverC(false);
                        }}></i>

                    {/* copy image to clipboard  */}
                    <i className="far fa-save" ref={copyClipRef}
                        onMouseOver={() => {
                            setIsHoverCC(true);
                        }}
                        onMouseOut={() => {
                            setIsHoverCC(false);
                        }}></i>

                    {/* share image  */}
                    <i className="far fa-share-square" onClick={shareImg} ref={slinkRef}
                        onMouseOver={() => {
                            setIsHoverS(true);
                        }}
                        onMouseOut={() => {
                            setIsHoverS(false);
                        }}></i>

                    {/* download image  */}
                    <i className="fas fa-download" onClick={downloadImg} ref={downloadRef}
                        onMouseOver={() => {
                            setIsHoverD(true);
                        }}
                        onMouseOut={() => {
                            setIsHoverD(false);
                        }}></i>
                </div>


            </div>
            {isHoverC || isHoverCC || isHoverS || isHoverD ?
                <div className="hover-msg" style={{ top: position.y, left: position.x, display: 'inline' }}>{hoverMsg}</div>
                : <></>
            }
        </>
    )
});

export default Image;
