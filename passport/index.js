const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('../db');
const config = require('../config');

// Local Strategy
const localOpts = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use(
  'login',
  new localStrategy(localOpts, (email, password, done) => {
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

// JWT Strategy
const jwtOpts = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  'jwt',
  new JWTStrategy(jwtOpts, (token, done) => {
    try {
      const user = db.users.list().find(user => user.id === token._id);

      if (!user) {
        throw new Error('This token not belongs to an existent user');
      }

      return done(null, token._id);
    } catch (err) {
      console.log(err.message);
      return done(err);
    }
  })
);

module.exports = passport;
