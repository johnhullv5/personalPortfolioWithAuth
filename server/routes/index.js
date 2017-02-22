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
router.get('/', (req, res, next) =>{
  res.render('content/index');
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
