// image
const { getDB } = require('../config/db');
const { openAI_IMG } = require('../services/openAIService');

// Base64 이미지 데이터 처리 엔드포인트
const processBase64Image = async (req, res) => {
    const { userid, food, imageUrl } = req.body;
    if (!userid || !food) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    console.log(`Received image from user: ${userid}`);

    try {
        const result = await openAI_IMG(userid, food);
        console.log(result);
        res.json({ result });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
};

// 이미지 저장 엔드포인트
const saveImage = async (req, res) => {
    const db = getDB(); //DB인스턴스 만들어주기
    const userId = req.query.userId;
    try {
        let image = await db.collection('image').insertOne({
            userId: userId,
            food: req.body.foodimage,
        });
        console.log(image.insertedId);
        await db.collection('record').insertOne({
            _id: image.insertedId,
            ok: req.body.Result.ok,
            foodName: req.body.Result.foodName,
            ingredient: req.body.Result.ingredients,
            notIngredients: req.body.Result.notIngredients,
        });
        res.json({ message: 'success' });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({ error: 'Error saving image' });
    }
};

module.exports = {
    processBase64Image,
    saveImage,
};
