import React from 'react';
import "../styles/ColorCard.css";

export default function ColorCard(props) {
    const { color } = props;
    const height = typeof props.height == 'undefined' ? "200px" : props.height;
    const width = typeof props.width == 'undefined' ? "200px" : props.width;

    return (
        <div className="ColorCard" style={{height, width}}>
            <div className="ColorBlock" style={{backgroundColor: color}}/>
            <p className="ColorLabel">{ color }</p>
        </div>
    )
}