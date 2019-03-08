const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('Do what thou wilt');
});

module.exports = router;
