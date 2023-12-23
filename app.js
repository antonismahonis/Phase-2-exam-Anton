require('@babel/register');
const express = require('express');
const app = express();
const config = require('./config/config');
const authRouter = require('./routes/auth.route');

// Остальные настройки вашего сервера (middleware, маршруты и т.д.)

const PORT = 3000;
config(app);
app.use('/auth', authRouter);
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
