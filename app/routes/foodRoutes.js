//food
const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/foodRecord', foodController.getFoodRecord);

module.exports = router;
