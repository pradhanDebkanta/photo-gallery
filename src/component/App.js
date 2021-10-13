import React, { useState, useEffect } from 'react';
import Unsplus from '../api/Unsplus';
import Theme from './theme/Theme';
import Navbar from './navbar/Navbar';
import ImageList from './imageList/ImageList';
import { Random } from './randomObject/Random';
import './App.css';

const App = () => {
    const [lightTheme, setLightTheme] = useState();
    const [term, setTerm] = useState('');
    const [images, setImages] = useState([]);
    

    const randomName=()=>{
        const number= Math.floor(Math.random()*Random.length);
        const name= Random[number];
        return name;
    };

    const onClickHandeler = (theme) => {
        setLightTheme(theme);
    };

    const formSubmit = (term) => {
        setTerm(term);
    };

    useEffect(
        () => {
            if(!term){
                setTerm(randomName());
            }
            Unsplus.get('/search/photos', {
                params: {
                    query: term,
                    per_page: 20
                }
            }).then((response) => {
                console.log(response,'from api')
                setImages(response.data.results);
            });
        }, [term]);
        
    return (
        <div className="App" data-theme={lightTheme ? "light" : "dark"}>
            <Theme theme={onClickHandeler} />
            <Navbar
                theme={lightTheme}
                onFormSubmit={(term) => formSubmit(term)}
                preTerm= {term}
            />
            <ImageList
                image={images}
                theme={lightTheme}
            />

        </div>
    );
}

export default App;