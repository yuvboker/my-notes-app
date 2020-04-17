import React, {useState} from "react";
import NoteDisplay from "./NoteDisplay";
import NoteEdit from "./NoteEdit";


function Note(props) {

    const [modalIsOpen,setIsOpen] = React.useState(false);


    const [note, setNote] = useState({
        title: props.title,
        content: props.content
    });


    const handleChange = event => {
        const { name, value } = event.target;

        setNote(prevNote => ({...prevNote, [name]: value}));
    }

    function updateNote(event) {
        props.onUpdate(props.id, note);
        event.preventDefault();
    }

    function removeNote(event) {
        props.onDelete(props.id);
        event.preventDefault();
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <div className="note">
            <NoteDisplay title={note.title}
                         content={note.content}
                         openModal={openModal}
                         removeNote={removeNote}/>
            <NoteEdit modalIsOpen={modalIsOpen} closeModal={closeModal}
                      handleChange={handleChange} note={note} updateNote={updateNote} />
        </div>
    );
}

export default Note;
