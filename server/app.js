/*
 * Copyright 2017 (C) <Centennial College> COMP308-assign1
 * 
 * Created on : 10-02-2017
 * Author     : Hao Jiang (300858525)
 *
 *-----------------------------------------------------------------------------
 * Revision History (Release 1.0.0.0)
 *-----------------------------------------------------------------------------
 */
//install middlewares
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');


//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let LocalStrategy = passportlocal.Strategy;
let flash = require('connect-flash'); // displays errors / login messages


// import "mongoose" - required for DB Access
let mongoose = require('mongoose');
// URI
let config = require('./config/db');

mongoose.connect(process.env.URI || config.URI);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Conneced to MongoDB...");
});

// define routers
let index = require('./routes/index');
let userinfos = require('./routes/userinfos'); 


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

//app.use('/', index);
// setup session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: true,
  resave: true
}));

// initialize passport and flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// route redirects
app.use('/', index);
//app.use('/userinfos', userinfos);

// Passport User Configuration
let UserModel = require('./models/users');
let User = UserModel.User; // alias for the User Model - User object
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Handle 404 Errors
  app.use(function(req, res) {
      res.status(400);
     res.render('errors/404',{
      title: '404: File Not Found'
    });
  });

  // Handle 500 Errors
  app.use(function(error, req, res, next) {
      res.status(500);
      res.render('errors/500', {
        title:'500: Internal Server Error',
        error: error
      });
  });

module.exports = app;
