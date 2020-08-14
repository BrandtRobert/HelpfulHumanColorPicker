import React from 'react';
import '../styles/Pagination.css';

/**
 * Creates and presents the pagination at the bottom of the list page.
 * On click of a pagination element update page in the main app is called.
 * This propagates the change of the page number to the cardview. This indirection in
 * state changes is something that could likely be solved with redux which I didn't use in this app.
 */
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