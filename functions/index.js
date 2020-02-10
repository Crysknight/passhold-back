const express = require('express');
const passport = require('passport');
const functions = require('firebase-functions');
const cookieSession = require('cookie-session');
const cors = require('cors');

const keys = require('./config/keys');
const whitelist = require('./config/whitelist');

require('./passport_setup');

const app = express();

const { auth } = require('./routes');

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error('not allowed'));
    }
  }
};

app.use(cors(corsOptions));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.cookieSalt]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);

module.exports.app = functions.region('us-central1').https.onRequest(app);
