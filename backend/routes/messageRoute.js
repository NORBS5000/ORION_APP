const express = require('express');
const router = express.Router();

router.get('/message', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});

module.exports = router;
