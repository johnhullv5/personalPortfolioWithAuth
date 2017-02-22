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
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object



// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}


/* GET home page. */
router.get('/', requireAuth,passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/about',
  failureFlash: 'bad login'
}),(req, res, next) =>{
  res.render('content/index');
});


// GET /login - render the login view
router.get('/login', (req, res, next)=>{
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login",
      
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/about'); // redirect to games list
  }
});


/* GET about page. */
router.get('/about', (req, res, next) =>{
  res.render('content/about', { title: 'About' });
});

/* GET contact page. */
router.get('/contact', (req, res, next) =>{
  res.render('content/contact');
});

/* GET project page. */
router.get('/project', (req, res, next) =>{
  res.render('content/project');
});

/* GET about page. */
router.get('/service', (req, res, next) =>{
  res.render('content/service');
});

/* GET about page. */
router.get('/trading', (req, res, next) =>{
  res.render('content/tradingResult');
});

module.exports = router;