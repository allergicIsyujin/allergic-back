//allergy
const { getDB } = require('../config/db');

// 알러지 정보 저장 엔드포인트
const saveAllergy = async (req, res) => {
    const db = getDB(); // DB인스턴스 만들어주기
    const { userId, food } = req.body;
    try {
        const userCollection = db.collection('user');
        let userInformation = await userCollection.findOne({ userId: userId });
        const filter = { _id: userInformation._id };

        // 새로운 알러지 필드 추가
        for (const value of food) {
            if (!userInformation.hasOwnProperty(value)) {
                const updateDoc = {
                    $set: {
                        [value]: false,
                    },
                };
                await userCollection.updateOne(filter, updateDoc);
            }
        }

        // 알러지 정보 업데이트
        userInformation = await userCollection.findOne({ userId: userId });
        const updateFields = {};
        for (const value of food) {
            updateFields[value] = !userInformation[value];
        }

        await userCollection.updateOne({ userId: userId }, { $set: updateFields });
        res.send('알러지를 수정하였습니다.');
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Error updating allergy information');
    }
};

// 나의 알러지 정보 조회 엔드포인트
const getMyAllergy = async (req, res) => {
    const db = getDB(); // DB인스턴스 만들어주기
    const { userId } = req.body;
    try {
        const userCollection = db.collection('user');
        let userInformation = await userCollection.findOne({ userId: userId });
        const trueFields = Object.keys(userInformation).filter(
            (key) => userInformation[key] === true
        );
        res.send(trueFields);
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Error fetching allergy information');
    }
};

// 새로운 알러지 정보 조회 엔드포인트
const getNewAllergy = async (req, res) => {
    const db = getDB(); // DB인스턴스 만들어주기
    const userId = req.query.userId;
    try {
        const newAllergies = [];
        const fields = [
            '_id',
            'userId',
            'userPs',
            '계란',
            '밀',
            '우유',
            '닭고기',
            '돼지고기',
            '견과류',
            '새우',
            '오징어',
            '고등어',
            '게',
            '조개',
            '복숭아',
        ];
        const userCollection = db.collection('user');
        let userInformation = await userCollection.findOne({ userId: userId });
        let documentKeys = Object.keys(userInformation);
        documentKeys.forEach((allergy) => {
            const find = fields.find((item) => item === allergy);
            if (find === undefined) newAllergies.push(allergy);
        });
        res.send(newAllergies);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching new allergy information');
    }
};

module.exports = {
    saveAllergy,
    getMyAllergy,
    getNewAllergy,
};
