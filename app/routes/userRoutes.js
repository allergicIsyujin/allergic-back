// user
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.login);
router.get('/duplication', userController.checkDuplication);
router.get('/signup', userController.signup);

module.exports = router;
