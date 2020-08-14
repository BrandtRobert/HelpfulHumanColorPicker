import React from 'react';
import ColorCard from './ColorCard';
import Button from './Button';
import useWindowDimensions from '../hooks/WindowDimensions'
import { useParams, Link } from 'react-router-dom';
import "../styles/ColorDetail.css";

function getRelatedColors(colors, currentColor) {
    let relatedColors = colors.filter((colorObj) => {
      return colorObj.family === currentColor.family
    })
    if (relatedColors.length < 3) {
        const randIdx = Math.trunc(Math.random() * 94)
        relatedColors = colors.slice(randIdx, randIdx + 5)
    }

    return relatedColors
}

/**
 * Color detail page view. Displays the color given in the url and tries to 
 *  generate a set of related colors based on the color given. If it can't 
 *  then it will just select some random colors from the available list.
 * Also uses the dimensions of the viewport to adjust the amount of related swatches displayed.
 * The clear buttom returns us back to the list view but does not clear out any of the previous filters.
 */
export default function ColorDetail(props) {
    const { color } = useParams();
    const { allColors } = props;
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

    const relatedColors = getRelatedColors(allColors, color);

    return (
        <div className="ColorDetail">
            <div id="mainCard">
                <ColorCard color={ "#" + color } height="100%" width="100%"/>
            </div>
            <div className="CardRow">
                {
                    relatedColors.slice(0, rowSize).map((c, idx) => {
                        return <ColorCard key={idx} color={c.color} height="120px" width="120px"/>
                    })
                }
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button value="Clear"></Button>
            </Link>
        </div>
    )
}