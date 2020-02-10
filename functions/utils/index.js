const admin = require('firebase-admin');
const { firebase } = require('../config/keys');

admin.initializeApp({
  credential: admin.credential.cert(firebase),
  databaseURL: 'https://passhold-8195f.firebaseio.com'
});

const db = admin.firestore();

module.exports = { admin, db };
