import React from "react";

function DropDown(props){
    return <div className="dropdown">
        <button className="btn btn-danger" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Remove all notes
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item deleteAll" onClick={props.onRemoveAll}>
                Do it!
            </button>
        </div>
    </div>
}

export default DropDown;