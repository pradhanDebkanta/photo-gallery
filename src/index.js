import React from 'react';
import reactDom from 'react-dom';
import './index.css';
import App from './component/App';
import reportWebVitals from './reportWebVitals';

reactDom.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>, document.getElementById('root'));

    reportWebVitals();
