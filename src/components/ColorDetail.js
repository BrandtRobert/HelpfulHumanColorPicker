import React from 'react';
import ColorCard from './ColorCard';
import Button from './Button';
import useWindowDimensions from '../hooks/WindowDimensions'
import { useParams, Link } from 'react-router-dom';
import "../styles/ColorDetail.css";

const relatedColors = ["#121212", "#123456", "#556677", "#445566", "#123488"];

export default function ColorDetail() {
    const { color } = useParams();
    const { width } = useWindowDimensions();

    let rowSize;
    if (width < 600) {
        rowSize = 2
    } else if (width < 1000) {
        rowSize = 3;
    } else if (width < 1200) {
        rowSize = 4;
    } else {
        rowSize = 5;
    }

    return (
        <div className="ColorDetail">
            <div id="mainCard">
                <ColorCard color={ "#" + color } height="100%" width="100%"/>
            </div>
            <div className="CardRow">
                {
                    relatedColors.slice(0, rowSize).map((c, idx) => {
                        return <ColorCard key={idx}color={c} height="120px" width="120px"/>
                    })
                }
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button value="Clear"></Button>
            </Link>
        </div>
    )
}