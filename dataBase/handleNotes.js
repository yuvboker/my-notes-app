const User = require('../models/userSchema');
const NoteModel = require('../models/noteSchema');
const Note = NoteModel.Note;

getNotes = async (req, res) => {
    const username = req.params.user;
    await User.findOne({username:username})
        .then(user => res.status(200).json({ success: true, data: user}))
        .catch(err => res.status(400).json({ success: false, error: err }))
}

createNote = async (req, res) => {
    const body = req.body
    const username = req.params.user;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a note',
        })
    }

    const note = new Note(body)

    if (!note) {
        return res.status(400).json({ success: false, error: "empty note" })
    }

    await User.updateOne({username:username},{$addToSet: {notes: note}})
        .then(() => res.status(201).json({success: true, message: 'Note created!'}))
        .cache(err => res.status(400).json({ success: false, error: err }));

}

deleteNotes = async (req, res) => {

    const username = req.params.user;
    await User.updateOne({username:username}, {$set: {notes:[]}})
        .then(()=>res.status(201).json({success: true, message: 'All Notes removed!'}))
        .catch(err => res.status(400).json({ success: false, error: err }) )

}


updateNoteByID = async (req, res) => {
    const body = req.body
    const username = req.params.user;
    const noteID = req.params.id;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.updateOne({ username: username, "notes._id": noteID},{ $set: {"notes.$": body}})
        .then((result) => res.status(200).json({success: true, data:result, message: 'Note Updated!'}))
        .catch(err => res.status(404).json({err, message: 'Note not found!'}));

}

deleteNoteByID = async (req, res) => {

    const body = req.body
    const username = req.params.user;
    const noteID = req.params.id;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.updateOne({ username: username },{ $pull: {notes:{ _id: noteID}}})
        .then(() => res.status(200).json({success: true, message: 'Note Removed!',}))
        .catch(err => res.status(404).json({err, message: 'Note not found!'}));

}

getNoteByID = async (req, res) => {
    const body = req.body
    const username = req.params.user;
    const noteID = req.params.id;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ username: username })
        .then( (user) => {
            if (user.notes.find(note => note._id.toString() === noteID)){
                return res.status(200).json({
                    success: true,
                    message: 'Note was found!',
                });
            }
            else{
                return res.status(404).json({
                    success: false,
                    message: 'Note not found!',
                });
            }
        } )
        .catch(err => res.status(404).json({err, message: 'Note not found!',}));
}

module.exports = {getNoteByID, getNotes, createNote, updateNoteByID, deleteNoteByID, deleteNotes}

