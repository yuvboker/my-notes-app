const passport = require('passport');
const User = require('../models/userSchema');
const findOrCreate= require('mongoose-findorcreate');

// 1. return false if the user exists.


createOrFind = async (req,res) => {
    const googleId = req.body.googleId;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    await User.findOrCreate({ username: googleId},{firstname: firstname, lastname: lastname}, function (err, user) {
        return res.status(200).json({success: true});
    })
};

logout = (req,res, next) =>{
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({success: true});
    });
}

getUsers = async (req, res) => {
    await User.find({})
        .then(users => res.status(200).json({success: true, data: users}))
        .catch(err => res.status(400).json({success: false, error: err}))
}

createUser = async (req, res, next) => {
    User.register(new User({username:req.body.username}), req.body.password, (err, user) =>{
            if(err){
                return res.status(500).send({ message : err.name });
            }
            passport.authenticate('local')(req, res, () => {
                req.session.save((err) => {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send('OK');
                });
            });
        }

    )

}


deleteUsers = async (req, res) => {

    await User.deleteMany({})
        .then(() => res.status(201).json({success: true, message: 'All Users removed!'}))
        .catch(err => res.status(400).json({ success: false, error: err }));

}

updateUser = async (req,res) => {
    const username = req.params.user;
    const updatedUser = {
        username: req.body.username,
        password: req.body.password,
        notes: req.body.notes
    }

    await User.updateOne({username: username}, updatedUser)
        .then(user => user.n?
            res.status(200).json({success: true, data: user, message: 'User updated!'}) :
            res.status(400).json({success: false, data:user, message: 'User not found!'})
        )
        .catch(err => res.status(404).json({err, message: 'User not found!'}));

}

fixUser = async (req, res) => {
    const username = req.params.user;

    await User.updateOne({username: username}, {$set: req.body})
        .then(user => user.nModified?
            res.status(200).json({success: true, data: user, message: 'User fixed!'}) :
            res.status(400).json({success: false, message: 'User not found!'})
        )
        .catch(err => res.status(404).json({err, message: 'User not found!'}));
}


deleteUser = async (req,res) => {
    const username = req.params.user;

    await User.deleteOne({username: username})
        .then(user => user.deletedCount?
            res.status(200).json({success: true, data: user, message: 'User deleted!'}) :
            res.status(400).json({success: false, message: 'User not found!'})
        )
        .catch(err => res.status(404).json({err, message: 'User not found!'}));
}

getUser = async (req,res) => {
    req.isAuthenticated()
        ? res.status(200).json({success: true, data:"Hello my friend", message: 'User found!'})
        : res.status(200).json({success: false, message: 'User is not authenticated!'})
}


validateUser =  (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err) {
        if (err) {
            return next(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                req.session.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send('OK');
                });
            });
        }})
}


module.exports = {logout, validateUser, getUser, getUsers, deleteUser, fixUser, updateUser, deleteUsers, createUser, createOrFind}
