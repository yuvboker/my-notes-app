require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandler = require('../dataBase/handleUser');
const noteHandler = require('../dataBase/handleNotes');

router.route('/auth/google')
    .post(userHandler.createOrFind);

router.route('/auth/google')
    .post(userHandler.createOrFind);

router.route('/logoutRequest')
    .get(userHandler.logout);

router.route('/login')
    .post(userHandler.validateUser);

router.route('/register')
    .post(userHandler.createUser)

router.route('/authenticate')
    .get(userHandler.getUser)
    .delete(userHandler.deleteUsers);

router.route('/:user/myNotes')
    .get(noteHandler.getNotes)
    .post(noteHandler.createNote)
    .delete(noteHandler.deleteNotes);

router.route('/:user/myNotes/:id')
    .get(noteHandler.getNoteByID)
    .put(noteHandler.updateNoteByID)
    .delete(noteHandler.deleteNoteByID);


module.exports = router;