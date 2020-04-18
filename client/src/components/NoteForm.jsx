import React from 'react';

function NoteForm(props){
    return <div>
        <input
        name="title"
        onChange={props.handleChange}
        value={props.note.title}
        placeholder={props.expand? "Title" : "Add something..."}
        autoComplete="off"
        />
        {props.expand &&
        <textarea
            name="content"
            onChange={props.handleChange}
            value={props.note.content}
            placeholder="Take a note..."
            autoComplete="off"
            rows="2"
        />}
    </div>
}

export default NoteForm;