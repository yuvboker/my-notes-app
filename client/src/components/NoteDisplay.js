import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function NoteDisplay(props){
    return <div>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={props.openModal}>
            <EditIcon />
        </button>
        <button onClick={props.removeNote}>
            <DeleteIcon />
        </button>
    </div>

}

export default NoteDisplay;