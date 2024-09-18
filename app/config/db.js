require('dotenv').config(); // 환경 변수 로드
const { MongoClient } = require('mongodb');
let db;

const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('DB 연결 성공');
        db = client.db('allergic');
    } catch (err) {
        console.error('DB 연결 실패:', err);
        throw err;
    }
}

connectDB();

module.exports = {
    getDB: () => db
};
