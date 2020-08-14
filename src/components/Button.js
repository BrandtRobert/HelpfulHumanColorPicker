import React from 'react';
import '../styles/Button.css'

export default function Button(props) {
    const {value} = props;

    const width = (typeof props.width == 'undefined') ? "150px" : props.width;

    return (
    <button className="Button" style={{width}}>{ value }</button>
    )
}