const config = require('../config');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt').ExtractJwt;

module.exports = () => {
  let opts;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.jwtSecret;

  passport.use('jwt', new JWTStrategy(opts,
      async (payload, done) => {
        try {
          console.log(payload);
          // search user
          return done(null, payload);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
