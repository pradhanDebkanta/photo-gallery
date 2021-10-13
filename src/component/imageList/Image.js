import React, { useRef } from 'react';
import { saveAs } from 'file-saver';

function Image({ item , handleClick}) {
    const reference = useRef();
    // console.log(item,'drom 6 deb')

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
        console.log(shareData, 'deb shareData')
        try {
            await navigator.share(shareData);
            console.log('share succesfully');

        } catch (err) {
            console.log('error: ', err);
        }
    }

    const downloadImg = () => {
        const imgSrc = item.urls.regular;
        const imgExt = '.png';
        saveAs(imgSrc, `${item.id}${imgExt}`);
    }

    return (
        <div className="image" onClick={()=>handleClick(item.urls.regular)}>
            <div className="img">
                <img ref={reference} src={item.urls.regular} alt={item.alt_description} className="img-fluid" />
            </div>
            <div className="down-box">
                <i className="fas fa-link" onClick={() => navigator.clipboard.writeText(item.urls.regular)}></i>
                <i className="far fa-save"></i>
                <i className="far fa-share-square" onClick={shareImg}></i>
                <i className="fas fa-download" onClick={downloadImg}></i>
            </div>
        </div>
    )
};

export default Image;
