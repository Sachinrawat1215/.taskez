const express = require('express');
const router = express.Router();
const controller = require('../Controller/auth');
const controller2 = require('../Controller/controller');

router.post('/api/signup', controller.registerUser);
router.post('/api/login', controller.loginUser);
router.get('/api/user/:email', controller2.getUserData);
router.post('/api/card', controller2.saveCardData);
router.get('/api/cards', controller2.getAllCards);
router.post('/api/updatecard', controller2.updateCard);

module.exports = router;