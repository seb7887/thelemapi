const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth');
const userController = require('../controllers/users');

router.get('/', (req, res) => {
  res.json('Do what thou wilt');
});

router.post('/auth/register', userController.register, authController.login);
router.post('/auth/login', authController.login);

module.exports = router;
