const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login, uploadImage } = require('./handlers/users');

// get data from firestore || screams route
app.get('/screams', getAllScreams);
// create new data and add to firestore
app.post('/scream', FBAuth, postOneScream);

// users routes
// Sign UP route
app.post('/signup', signup);
// login routes
app.post('/login', login);

// image upload route
app.post('/users/image', FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);

// change region
// exports.api = functions.region('europe-west1').https.onRequest(app);
