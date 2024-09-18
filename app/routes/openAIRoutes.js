// openAI
const express = require('express');
const router = express.Router();
const openAIService = require('../services/openAIService');

// OpenAI 텍스트 처리 엔드포인트
router.post('/say', async (req, res) => {
    try {
        const result = await openAIService.openAI_SAY(
            req.body.id,
            req.body.food
        );
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
    }
});

module.exports = router;
