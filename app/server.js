// server.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

// DB 연결
require('./config/db');

// 미들웨어
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// 라우터 설정
const userRoutes = require('./routes/userRoutes');
const allergyRoutes = require('./routes/allergyRoutes');
const imageRoutes = require('./routes/imageRoutes');
const foodRoutes = require('./routes/foodRoutes');
const openAIRoutes = require('./routes/openAIRoutes');

app.use('/user', userRoutes);
app.use('/allergy', allergyRoutes);
app.use('/image', imageRoutes);
app.use('/food', foodRoutes);
app.use('/openAI', openAIRoutes);

app.listen(port, () => {
    console.log(`http://localhost:${port} 에서 서버 실행중`);
});
