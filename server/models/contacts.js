/*
 * Copyright 2017 (C) <Centennial College> COMP308-assign1
 * 
 * Created on : 10-02-2017
 * Author     : Hao Jiang (300858525)
 * File Name      : contacts.js //contact model
 * web app Name   : mypersonalPortfolio  
 *-----------------------------------------------------------------------------
 * Revision History (Release 1.0.0.0)
 *-----------------------------------------------------------------------------
 */
// require modules for our User Model
let mongoose = require('mongoose');



let contactsSchema =  mongoose.Schema({
  contactname:String,
 contactnumber:String, 
  contactemail: String
},{
  collection: "contacts"
});

//let options = ({missingPasswordError: "Wrong Password"});

//BusinessContactSchema.plugin(passportLocalMongoose, options);

//exports.BusinessContact = mongoose.model('BusinessContact', BusinessContactSchema);

module.exports = mongoose.model('contacts', contactsSchema);