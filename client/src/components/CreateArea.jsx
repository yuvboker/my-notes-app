import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import NoteForm from "./NoteForm";
import DropDown from "./DropDown";

function CreateArea(props) {

    const [isExpended, setExpend] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function submitNote(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
    }

    function expand(){
        setExpend(true);
    }
    return (
        <div>
            <DropDown onRemoveAll={props.onRemoveAll}/>
            <form onClick={expand} className="create-note">
                <NoteForm handleChange={handleChange} note={note} expand={isExpended} />
                <Zoom in={isExpended}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
