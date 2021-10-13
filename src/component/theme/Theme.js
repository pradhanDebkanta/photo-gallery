import React, { Component } from 'react';
import { Svg } from '../svgSourse/Svg';
import './Theme.css';

let localStorageTheme = JSON.parse( window.localStorage.getItem('theme'));
if(localStorageTheme===null){
    window.localStorage.setItem('theme', JSON.stringify(true));
    localStorageTheme= true;
}

class Theme extends Component {
    constructor(props) {
        super(props);
        this.state = { lightTheme: localStorageTheme };
    }

    clickHandeler = () => {
        this.setState({ lightTheme: !this.state.lightTheme },
            () => {
                window.localStorage.setItem('theme', JSON.stringify(this.state.lightTheme));
                this.props.theme(this.state.lightTheme);
            }
        );
    }
    componentDidMount() {
        this.setState({},
            () => {
                this.props.theme(this.state.lightTheme);
            }
        );
    }
    render() {
        const { lightTheme } = this.state;
        return (
            <div className="setting-box">
                <div className="setting-button-box" onClick={this.clickHandeler}>
                    {Svg[0].svg}
                </div>
                <div className="hover-box">
                    <p className="hover-text">Click to switch into {lightTheme ? "dark" : "light"} mode</p>
                    <span className="triangle"></span>
                </div>
            </div>
        );
    }
}

export default Theme;