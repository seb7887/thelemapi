const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const authController = require('../controllers/auth');
const userController = require('../controllers/users');

// Middleware
const validate = require('../middleware/validate');

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
router.post('/auth/login', authController.login);

// Protected Routes
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userController.getUsers
);

module.exports = router;
