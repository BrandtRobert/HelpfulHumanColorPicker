import React from 'react';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../hooks/WindowDimensions.js'
import ColorCard from './ColorCard.js';
import '../styles/CardGrid.css'

function arrangeColors(colors, itemsPerRow,page) {
    // Reshape colors to 4x4 array and then display row by row
    // Chose to do this over flexbox wrapping to maintain consistency
    const toMatrix = (arr, width) => 
        arr.reduce((rows, key, index) => (index % width === 0 ? rows.push([key]) 
        : rows[rows.length-1].push(key)) && rows, []);
    // Slice for a max of 12 cards per page
    const rows = 12 / itemsPerRow;
    return toMatrix(colors, itemsPerRow).slice(page * rows, (page*rows) + rows);
}

function getItemsPerRow(width) {
    // Using the dimesions queried from the hook change the number of cards displayed depending on the page size
    if (width < 600) {
        return 1;
    } else if (width < 900) {
        return 2;
    } else if (width < 1200) {
        return 3;
    } else {
        return 4;
    }
}

export default function CardGrid(props) {
    const {width} = useWindowDimensions();
    const {page} = props;
    let colors = props.colors;
    if (props.filter !== '') {
        colors = colors.filter((colorObj) => {
            return colorObj.family === props.filter
        });
    }
    // Get the number of card to display per row
    const itemsPerRow = getItemsPerRow(width);
    // Slice for a max of 12 cards per page
    const colorMatrix = arrangeColors(colors, itemsPerRow, page);

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
                                to={"/color-detail/" + color.color.substr(1)} 
                                style={{ textDecoration: "none" }} 
                                key={ id }
                            >
                                <ColorCard color={ color.color } key={ id }></ColorCard>
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