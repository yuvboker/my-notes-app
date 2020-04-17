const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const notesSchema = new mongoose.Schema({
    title: {type: String, required:true},
    content: {type:String, required:true}
});


const Note = new mongoose.model("Note", notesSchema);

const NoteModel = {Note, notesSchema};
module.exports = NoteModel;