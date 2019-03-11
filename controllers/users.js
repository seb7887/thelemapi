const db = require('../db');

exports.register = (req, res, next) => {
  const { email, password } = req.body;
  console.log('hellooo');

  try {
    db.users.create({ email, password });
    next();
  } catch (err) {
    return res.status(400).send();
  }
};
