import React from 'react';
import '../styles/TopBar.css';
import logo from '../logo.svg';

/**
 * Displays the logo of the app and presents the search bar functionality.
 *  This triggers an update event in the main app which filters through color swatches based
 *  on their text values.
 */
function TopBar(props) {
    const {updateSearch} = props
    return (
        <div className="TopBar" data-testid="TopBar">
            <img id="logo" src={logo} alt="Helpful Human Logo"></img>
            <input id="searchBar" type="text" defaultValue="Search" onChange={updateSearch}></input>
        </div>
    )
}

export default TopBar;