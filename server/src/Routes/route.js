const express = require('express');
const router = express.Router();
const controller = require('../Controller/auth');

router.post('/api/signup', controller.registerUser);
router.post('/api/login', controller.loginUser);

module.exports = router;