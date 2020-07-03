import React from 'react';
import './Curtain.scss';

export default class Curtain extends React.Component {
    render() {
        return (
            <div className={`${this.props.shouldClose === true ? "close" : "open"} curtain`}></div>
        )
    }
}