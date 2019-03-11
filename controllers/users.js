const db = require('../db');

exports.register = (req, res, next) => {
  const { email, password } = req.body;

  try {
    db.users.create({ email, password });
    next();
  } catch (err) {
    return res.status(400).send();
  }
};

exports.getUsers = (req, res) => {
  try {
    const users = db.users.list();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(400).send();
  }
};
