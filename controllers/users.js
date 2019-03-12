const db = require('../db');

exports.register = (req, res, next) => {
  const { email, password } = req.body;

  try {
    db.users.create({ email, password });
    next();
  } catch (err) {
    return next(err.message);
  }
};

exports.getUsers = (req, res, next) => {
  try {
    const users = db.users.list();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
