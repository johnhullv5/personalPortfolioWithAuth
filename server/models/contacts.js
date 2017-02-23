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