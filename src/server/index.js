const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

// import Mongoose and the User model which is the Book
const mongoose = require('mongoose');
const User = require('./models/User');

const server = express();
// Name of the database
const dbname = 'MyMongoDB';

// serve files from the dist directory
server.use(express.static('dist'));

// URL to the online database which is loaded from an env variable initiated in the console
const mongo_uri = process.env.MONGODB_URL;

let db;

mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// define the various endpoints

// retrieve all book objects
server.get('/api/users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// Retrieve a book with a specific genre
server.get('/api/:genre', (req, res) => {
  User.find({selectedGenre : req.params.genre }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// retrieve a book with specific ID
server.get('/api/users/:id', (req, res) => {
  User.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// deletea book with a specific ID
server.delete('/api/users', (req, res) => {
  User.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

// create new book based on info supplied in request body
server.post('/api/users', (req, res) => {
  // create a new book object using the Mongoose model and the data sent in the POST
  const user = new User(req.body);
  // save this object to the DB
  user.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

// update the book based on info supplied in request body
server.put('/api/users', (req, res) => {
  // get the ID of the book to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a book matching this ID and update their details
  User.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
