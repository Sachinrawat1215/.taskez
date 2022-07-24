const express = require('express');
const router = express.Router();
const controller = require('../Controller/auth');
const controller2 = require('../Controller/controller');
const validate = require('../middleware/validate');

router.post('/api/signup', controller.registerUser);
router.post('/api/login', controller.loginUser);
router.get('/api/user', validate, controller2.getUserData);
router.post('/api/card', validate, controller2.saveCardData);
router.get('/api/cards', validate, controller2.getAllCards);
router.post('/api/updatecard', validate, controller2.updateCard);
router.get('/api/logout', validate, controller.logoutUser);
router.get('/api/card/:id', validate, controller2.getCardData);
router.delete('/api/deletecard/:id', validate, controller2.deleteCard);

module.exports = router;