import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Svg } from '../svgSourse/Svg';
import './Navbar.css';

const useWindowWidth= ()=>{
	const [size, setSize] = useState(0);
useLayoutEffect(()=>{
        function newWidth(){
            setSize(window.innerWidth);
        };
        window.addEventListener('resize', newWidth);
        newWidth();
        return ()=>window.removeEventListener('resize', newWidth);
    },[]);
    return size;
}

const Navbar = (props) => {
    const [term, setTerm] = useState('');
    const [handleClick, setHandleClick] = useState(false);
    const inputClass = `input-box ${handleClick ? "show-box" : "hidden-box"}`;
    const ref = useRef();

    const size= useWindowWidth();

    useEffect(() => {
        document.body.addEventListener("click", (event) => {
            if (ref.current.contains(event.target)) {
                return;
            }
            setHandleClick(false);
        })
    }, []);


    const onSubmitHandeler = (event) => {
        event.preventDefault();
        props.onFormSubmit(term);
    }
    return (
        <div className="container">
            <nav className="navbar navbar-expend-sm">
                <a className="navbar-brand" href="./" onClick={(e)=>e.preventDefault()}>
                    <div className="brand-img-box" >
                        {Svg[1].svg}
                    </div>
                    <h5 className="brand-name">Photo Gallery</h5>
                </a>
                <form className="form" onSubmit={onSubmitHandeler}>
                    <div className="search-box" ref={ref}>
                        <div className={inputClass}>
                            <input className="search-input" type="text" value={term}
                             onChange={(e) => setTerm(e.target.value)}  
                             placeholder={size>991? "Search high Res photo":"Search a photo"}
                             />
                        </div>
                        <div className="search-button" onClick={() => setHandleClick(!handleClick)}>
                            {Svg[2].svg}    {/* className: search-btn-img */}
                        </div>
                    </div>
                </form>

            </nav>
        </div>
    );
}

export default Navbar;