const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const { db } = require('../utils');

module.exports = new GoogleStrategy(
  {
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: process.env.NODE_ENV === 'DEVELOPMENT'
      ? '/passhold-8195f/europe-west1/app/auth/google/redirect'
      : 'https://us-central1-passhold-8195f.cloudfunctions.net/app/auth/google/redirect'
  },
  async (_accessToken, _refreshToken, profile, done) => {
    const {
      id,
      provider,
      name: {
        givenName: firstName,
        familyName: lastName
      },
      photos: [{ value: avatar }],
      emails: [{ value: email }]
    } = profile;
    const UID = `${id}_${provider}`;

    const userPath = `/users/${UID}`;
    const userData = { id: UID, firstName, lastName, avatar, email };
    const user = await db.doc(userPath).get();
    if (user.exists) {
      return done(null, user.data());
    } else {
      await db.doc(userPath).set(userData);
    }

    done(null, userData);
  }
);
