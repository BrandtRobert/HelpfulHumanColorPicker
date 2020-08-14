import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Pagination.css';

export default function Pagination(props) {
    // const {numColors, currentPage} = props;
    const {numColors, currentPage} = {numColors: 10, currentPage: 1};
    const pages = [...Array(10).keys()];
    return (
        <ul className="PaginationList">
        {
        pages.map((num, idx) => {
            return(
                currentPage === (idx+1) ? (
                    <li key={ idx } style={{borderBottom: "2px solid black" }}><Link to={"/" + (num + 1)}>{ num + 1 }</Link></li>
                ) : (
                    <li key={ idx }><Link to={"/" + (num + 1)}>{ num + 1 }</Link></li>
                )
            )
        })
        }
        </ul>
    )
} 