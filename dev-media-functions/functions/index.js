const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth');
const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream
} = require('./handlers/screams');
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require('./handlers/users');

// scream routes
// get data from firestore || screams route
app.get('/screams', getAllScreams);
// create new data and add to firestore
app.post('/scream', FBAuth, postOneScream);

// get one scream by id route
app.get('/scream/:screamId', getScream);

// delete one scream by id route
// app.delete('/scream/:screamId', FBAuth, deleteScream);

// like a scream route
app.get('/scream/:screamId/like', FBAuth, likeScream);

// unlike scream route
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);

// comment a scream route
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

// users routes
// Sign UP route
app.post('/signup', signup);
// login routes
app.post('/login', login);
// image upload route
app.post('/user/image', FBAuth, uploadImage);
// Add user details route
app.post('/user', FBAuth, addUserDetails);

// To get Authenticated User
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);

// change region
// exports.api = functions.region('europe-west1').https.onRequest(app);
