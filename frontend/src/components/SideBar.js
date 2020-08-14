import React from 'react';
import { useHistory } from "react-router-dom";
import Button from './Button.js';
import '../styles/SideBar.css';

/**
 * Sidebar component for the app, manages a button which will send us to the details page
 *  of a random color. In addition, it allows presents a set of filters which allow us to filter by color family.
 */
function SideBar(props) {
    const {updateFilter, clearColorFilter, randomColor} = props;
    const colorFilters = [
        "Red", "Green", "Blue", "Yellow", "Grey", "Teal"
    ]
    const history = useHistory();
    return (
        <div className="SideBar" data-testid="SideBar">
            <Button value="Random Color" width="100%" onClick={() => history.push("/color-detail/" + randomColor().substr(1))}></Button>
            <ul>
                {colorFilters.map((f, idx) => {
                    return <li onClick={updateFilter} key={idx}>{f}</li>
                })}
                <li onClick={clearColorFilter}>Reset</li>
            </ul>
        </div>
    )
}

export default SideBar;