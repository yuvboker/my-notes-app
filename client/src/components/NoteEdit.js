import React from 'react'
import customStyles from "./popupStyle";
import NoteForm from "./NoteForm";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Modal from "react-modal";

function NoteEdit(props){
    return <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
                style={customStyles}
            >
                <form className="create-note">
                    <NoteForm handleChange={props.handleChange} note={props.note} expand={true} />
                    <button id="thumbUpIcon" onClick={props.updateNote}>
                        <ThumbUpIcon />
                    </button>
                </form>
            </Modal>
}

export default NoteEdit;