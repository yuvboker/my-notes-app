import React from "react";
import apis from "../api";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import useDataApi from "../dataManipulation/dataFetch";
import {Redirect} from "react-router-dom";


function UserNotes(props) {


    const googleId = props.match.params.googleId;
    const user = googleId? googleId : props.match.params.username;
    const [{notes, firstName, isLoading, isError}, valid, setUpdate, greeting] = useDataApi([], props.match.params.username, props.match.params.googleId);

    function addNote(newNote) {
        apis.add(user, newNote).then(() => setUpdate(prevState => !prevState));
    }

    function deleteNote(id) {
        apis.deleteByID(user, id).then(() => setUpdate(prevState => !prevState));
    }

    function updateNote(id, note) {
        apis.updateByID(user, id, note).then(() => setUpdate(prevState => !prevState));
    }

    function removeAll() {
        apis.deleteAll(user).then(() => setUpdate(prevState => !prevState));
    }

    return (
        <div>
            <h1 id="welcome">{greeting + firstName}</h1>
            <h1>{process.env.CLIENT_ID}</h1>
            {!valid && <Redirect to={{
                pathname: '/',
            }}
            />}
            <CreateArea onAdd={addNote} onRemoveAll={removeAll} />
            {isError && <div>Something went wrong ...</div>}
            {isLoading? <p>Loading...</p> :
            notes.map( noteItem =>
                    <Note
                        key={noteItem._id}
                        id={noteItem._id}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                        onUpdate={updateNote}
                    />
            )}
            <Footer isGoogleLogin={props.match.params.googleId} />
        </div>
    );
}

export default UserNotes;
