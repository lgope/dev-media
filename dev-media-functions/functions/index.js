const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth');
const { db } = require('./util/admin');

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require('./handlers/screams');
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require('./handlers/users');

// scream routes
// get data from firestore || screams route
app.get('/screams', getAllScreams);
// create new data and add to firestore
app.post('/scream', FBAuth, postOneScream);

// get one scream by id route
app.get('/scream/:screamId', getScream);

// delete one scream by id route
app.delete('/scream/:screamId', FBAuth, deleteScream);

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

// get user details by handle route
app.get('/user/:handle', getUserDetails);

// notifications read route
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

// change region
// exports.api = functions.region('europe-west1').https.onRequest(app);

// notification on likes
exports.createNotificationOnLike = functions.firestore
  .document('likes/{id}')
  .onCreate(snapshot => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            screamId: doc.id,
            read: false,
          });
        }
      })
      .catch(err => console.error(err));
  });

// delete notification on unlike scream
exports.deleteNotificationOnUnLike = functions.firestore
  .document('likes/{id}')
  .onDelete(snapshot => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => console.error(err));
  });

// create notification on comment
exports.createNotificationOnComment = functions.firestore
  .document('comments/{id}')
  .onCreate(snapshot => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch(err => console.error(err));
  });

// change image of all srceams when user change image
exports.onUserImageChange = functions.firestore
  .document('/users/{userId}')
  .onUpdate(change => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log('image has changed');
      const batch = db.batch();
      return db
        .collection('screams')
        .where('userHandle', '==', change.before.data().handle)
        .get()
        .then(data => {
          data.forEach(doc => {
            const scream = db.doc(`/screams/${doc.id}`);
            batch.update(scream, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

// on screams delete, delete all notifications related to this screams
exports.onScreamDelete = functions
  .firestore.document('/screams/{screamId}')
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection('comments')
      .where('screamId', '==', screamId)
      .get()
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection('likes').where('screamId', '==', screamId).get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection('notifications')
          .where('screamId', '==', screamId)
          .get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch(err => console.error(err));
  });
