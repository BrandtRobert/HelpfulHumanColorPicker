import React from 'react';
import Button from './Button.js';
import '../styles/SideBar.css';

function SideBar(props) {
    return (
        <div className="SideBar" data-testid="SideBar">
            <Button value="Random Color" width="100%"></Button>
            <ul>
                <li>Red</li>
                <li>Green</li>
                <li>Blue</li>
                <li>Orange</li>
            </ul>
        </div>
    )
}

export default SideBar;