import React from "react";
import ScheduleSharpIcon from '@material-ui/icons/ScheduleSharp';

function Header() {
    return (
        <header>
            <h1>Save-Time<ScheduleSharpIcon style={{ fontSize: 30}} className="highlight"/></h1>
        </header>
    );
}

export default Header;
