import React from 'react';
import ColorCard from './ColorCard.js';
import useWindowDimensions from '../hooks/WindowDimensions.js'
import {Link} from 'react-router-dom';
import '../styles/CardGrid.css'

export default function CardGrid(props) {
    const { colors } = props;
    const { width } = useWindowDimensions();
    // Reshape colors to 4x4 array and then display row by row
    // Chose to do this over flexbox wrapping to maintain consistency
    const toMatrix = (arr, width) => 
        arr.reduce((rows, key, index) => (index % width === 0 ? rows.push([key]) 
        : rows[rows.length-1].push(key)) && rows, []);
    // Using the dimesions queried from the hook change the number of cards displayed depending on the page size
    let itemsPerRow;
    if (width < 600) {
        itemsPerRow = 1;
    } else if (width < 900) {
        itemsPerRow = 2;
    } else if (width < 1200) {
        itemsPerRow = 3;
    } else {
        itemsPerRow = 4;
    }
    // Slice for a max of 12 cards per page
    const colorMatrix = toMatrix(colors, itemsPerRow).slice(0, 12 / itemsPerRow);

    const totalCards = colors.length;
    const pages = [...Array(Math.trunc(10)).keys()];

    return (
        <div className="CardGrid">
        {
        colorMatrix.map((colorRow, rowIndex) => {
            return (
                <div className="CardRow" key={ rowIndex }>
                    {
                    colorRow.map((color, idx) => {
                        const id = rowIndex * itemsPerRow + idx;
                        return (
                            <Link 
                                to={"/color-detail/" + color.substr(1)} 
                                style={{ textDecoration: "none" }} 
                                key={ id }
                            >
                                <ColorCard color={ color } key={ id }></ColorCard>
                            </Link>
                        )
                    })
                    }
                </div>
            )
        })
        }
        </div>
    );
}