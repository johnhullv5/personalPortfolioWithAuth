let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// define the contact model
let contact = require('../models/contacts');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET contacts List page. READ */
router.get('/', requireAuth,(req, res, next) => {
  // find all contacts in the contacts collection
  contact.find({},null,{sort: {'contactname':1}},(err, contacts) => {
    if (err) {
      console.log("???")
      return console.error(err);
    }
    else {
      console.log(contacts.length)
      res.render('contacts/index', {
        title: "Contact List",
        contacts: contacts,
        displayName: req.user.displayName
      });
      
    }
  });

});

//  GET the Game Details page in order to add a new Game
router.get('/add', requireAuth, (req, res, next) => {
  res.render('contacts/details', {
    title: "Add a new Contact",
    contacts: '',
    displayName: req.user.displayName
  });
});

// POST process the Contact Details page and create a new Contact - CREATE
router.post('/add', requireAuth, (req, res, next) => {

    let newContact = contact({
      "contactname": req.body.contactname,
      "contactnumber": req.body.contactnumber,
      "contactemail": req.body.contactemail
    });

    contact.create(newContact, (err, contact) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/contacts');
      }
    });
});

// GET the Game Details page in order to edit a new Game
router.get('/:id', requireAuth, (req, res, next) => {

    try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one game by its id
      contact.findById(id, (err, contacts) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the contacts details view
          res.render('contacts/details', {
              title: 'Contacts Details',
              contacts: contacts,
              displayName: req.user.displayName
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

     let updatedContact = contact({
       "_id": id,
      "contactname": req.body.name,
      "contactnumber": req.body.cost,
      "contactemail": req.body.rating
    });

    contact.update({_id: id}, updatedContact, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the game List
        res.redirect('/contacts');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

    contact.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the games list
        res.redirect('/contacts');
      }
    });
});


module.exports = router;