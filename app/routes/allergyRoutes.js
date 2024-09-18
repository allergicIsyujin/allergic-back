//allergy
const express = require('express');
const router = express.Router();
const allergyController = require('../controllers/allergyController');

router.post('/save', allergyController.saveAllergy);
router.post('/myAllergy', allergyController.getMyAllergy);
router.get('/newAllergy', allergyController.getNewAllergy);

module.exports = router;
