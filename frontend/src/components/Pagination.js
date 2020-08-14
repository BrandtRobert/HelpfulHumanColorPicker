import React from 'react';
import '../styles/Pagination.css';

export default function Pagination(props) {
    const {numPages, updatePage, page} = props;
    const pages = [...Array(numPages).keys()];
    return (
        <ul className="PaginationList">
        {
        pages.map((num, idx) => {
            return(
                page === (idx) ? (
                    <li 
                        key={ idx } 
                        onClick={() => updatePage(num)} 
                        style={{borderBottom: "2px solid black" }}
                    >
                        {num + 1}
                    </li>
                ) : (
                    <li key={ idx } onClick={() => updatePage(num)}>{ num + 1 }</li>
                )
            )
        })
        }
        </ul>
    )
} 