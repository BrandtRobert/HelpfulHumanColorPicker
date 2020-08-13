import React from 'react';
import '../styles/TopBar.css';
import logo from '../logo.svg';

function TopBar(props) {
    return (
        <div className="TopBar" data-testid="TopBar">
            <img id="logo" src={logo} alt="Helpful Human Logo"></img>
        </div>
    )
}

export default TopBar;