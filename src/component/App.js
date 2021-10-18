import React, { useState, useEffect } from 'react';
import Unsplus from '../api/Unsplus';
import Theme from './theme/Theme';
import Navbar from './navbar/Navbar';
import ImageList from './imageList/ImageList';
import { Random } from './randomObject/Random';
import SearchAImg from './noResult/SearchAImg';
import NoResult from './noResult/NoResult';
import ErrorPage from './noResult/ErrorPage';
import './App.css';

const App = () => {
    const [lightTheme, setLightTheme] = useState();
    const [term, setTerm] = useState('');
    const [images, setImages] = useState([]);
    const [isReqSend, setIsReqSend] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [error, setError] = useState([]);


    const randomName = () => {
        const number = Math.floor(Math.random() * Random.length);
        const name = Random[number];
        return name;
    };

    const onClickHandeler = (theme) => {
        setLightTheme(theme);
    };

    const formSubmit = (term) => {
        setIsReqSend(false);
        setTerm(term);
        setPageNo(1);
        setImages([]);
    };

    useEffect(
        () => {
            if (!term) {
                setTerm(randomName());
            }
            if (term !== '') {
                Unsplus.get('/search/photos', {
                    params: {
                        query: term,
                        per_page: 7,
                        page: pageNo,
                        // order_by: 'latest',
                        rel: "first",
                    }
                }).then((response) => {
                    setIsReqSend(true);
                    // console.log(response, 'from api');
                    setImages(item => {
                        let totalitem = [...item, ...response.data.results];
                        // console.log(totalitem.length, 'total images')
                        // let netItem = Object.values(totalitem[0]).map(item => { return item });
                        // console.log(netItem, 'from net', typeof (netItem))
                        return totalitem;
                    });
                    setTotalResult(response.data.total);
                    setTotalPage(response.data.total_pages);
                }).catch(e => {
                    setError([JSON.stringify(e)]);
                });
            }
        }, [term, pageNo]);
    const changePageNo = () => {
        setPageNo((prevPageNo) => prevPageNo + 1);
    }
    // console.log(pageNo);
    return (
        <div className="App" data-theme={lightTheme ? "light" : "dark"}>
            <Theme theme={onClickHandeler} />
            <Navbar
                theme={lightTheme}
                onFormSubmit={(term) => formSubmit(term)}
                preTerm={term}
            />

            {images.length ?
                <ImageList
                    image={images}
                    theme={lightTheme}
                    total_results={totalResult}
                    total_pages={totalPage}
                    nextPage={changePageNo}
                />
                : <></>}
            {
                error[0] ? <ErrorPage msg={error[0]} theme={lightTheme} /> : !isReqSend ? <SearchAImg term={term} /> : !images.length ? <NoResult term={term} /> : <></>
            }

            <footer className="footer-container">
                <p className="footer-text">🧡 Design by 
                 <a href="https://github.com/pradhanDebkanta/" className="debkanta" target="_blank" rel="noreferrer noopener">Debkanta Pradhan</a></p>
            </footer>

        </div>
    );
}

export default App;