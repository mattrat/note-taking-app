var express = require('express');
var router = express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localstorage');
}

/* GET home page. */
router.get('/', function(req, res, next) {

  // Get existing Notes
  if( localStorage.length > 0 ) {
    var data = {};
    data.notes = JSON.parse(localStorage.getItem("notes"));

  }

  console.log(data);

  res.render('index', { title: 'Express', data });

});

router.post('/note', function(req, res) {
  console.log('New note');

  // View Results of form submission
  console.log(req.body);

  // Store form contents to localstorage
  var newNote = {};

  newNote.title = req.body.title;
  newNote.content = req.body.content;

  // Get list of existing notes or create new list
  if( localStorage.length > 0 ) {
    var notes = localStorage.getItem("notes");
    notes = JSON.parse(notes);
  } else {
    var notes = [];
  }

  // Add new note to note list
  notes.push(newNote);

  // Store notes list in localstorage
  localStorage.setItem("notes", JSON.stringify(notes));

});

router.get('/note/:slug', function(req, res) {
  console.log('This is a note');
});

router.put('/note/:slug', function(req, res) {
  console.log('Edit a note');
});

router.get('/note/:slug/delete', function(req, res) {
  console.log('This note no longer exists');
});

module.exports = router;
