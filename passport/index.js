const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../db');

// Local Strategy
const opts = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use(
  'login',
  new localStrategy(opts, (email, password, done) => {
    const user = db.users.list().find(user => user.email === email);

    if (!user) {
      return done(null, false, { message: 'Unexistent User' });
    }

    const isMatch = user.password === password;

    if (!isMatch) {
      return done(null, false, { message: 'Wrong Password' });
    }

    return done(null, user);
  })
);

module.exports = passport;
