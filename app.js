require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('passport-local-mongoose')
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MongoStore = require('connect-mongo')(session);


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin:['http://localhost:8000'],
  methods:['GET','POST','PUT','DELETE'],
  credentials: true // enable set cookie
}));

const options = {useUnifiedTopology:true, useNewUrlParser:true, useFindAndModify: false };
const url = "mongodb+srv://admin-Yuval:" + process.env.MONGOOSE_PASSWORD +"@cluster0-8qshu.mongodb.net/usersDB";

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

app.use(session({
  secret: 'This is a secret',
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection}),
  saveUninitialized: false,
  unset: 'destroy'
}));

app.use(express.static(path.join(__dirname, 'public')));
// view engine setup


app.use(passport.initialize());
app.use(flash());
app.use(passport.session());



const User = require('./models/userSchema');

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/notes",
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
         });
    }
));




app.use('/', require('./routes/index'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
