const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');

const generateAuthToken = user => {
  const token = jwt.sign({ _id: user.id }, config.jwtSecret);
  return token;
};

exports.login = (req, res) => {
  passport.authenticate('login', (err, user, info) => {
    if (err || !user) {
      return res.status(400).json(info);
    }

    const token = generateAuthToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return res.status(200).json({ email: user.email });
  })(req, res);
};
