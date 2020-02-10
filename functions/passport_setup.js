const passport = require('passport');

const { Google } = require('./strategies');
const { db } = require('./utils');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.doc(`/users/${id}`).get();
  if (user.exists) {
    done(null, user.data());
  } else {
    done('user not found', null);
  }
});

passport.use(Google);
