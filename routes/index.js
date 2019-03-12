const express = require('express');
const router = express.Router();
const passport = require('passport');
const ExpressBrute = require('express-brute');

// Controllers
const authController = require('../controllers/auth');
const userController = require('../controllers/users');

// Middleware
const validate = require('../middleware/validate');

// Brute Force Protection
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

// Public Routes
router.get('/', (req, res) => {
  res.json('Do what thou wilt');
});

// Auth Routes
router.post(
  '/auth/register',
  validate.validateRegister,
  userController.register,
  authController.login
);
router.post('/auth/login', bruteforce.prevent, authController.login);

// Protected Routes
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userController.getUsers
);

module.exports = router;
