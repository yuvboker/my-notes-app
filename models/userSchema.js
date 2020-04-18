const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const NoteModel = require('./noteSchema');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    notes: [NoteModel.notesSchema],
    googleId: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = new mongoose.model('User', userSchema);
