require('@babel/register');
const express = require('express');
const net = require('net');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const app = express();
const config = require('./config/config');
const authRouter = require('./routes/auth.route');
const Home = require('./views/Home');

app.use(express.static('public'));

// Остальные настройки вашего сервера (middleware, маршруты и т.д.)

config(app);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send(ReactDOMServer.renderToString(React.createElement(Home)));
});

function findFreePort(startAt, callback) {
    const server = net.createServer();
    server.listen(startAt, () => {
        server.once('close', () => {
            callback(startAt);
        });
        server.close();
    });

    server.on('error', () => {
        findFreePort(startAt + 1, callback);
    });
}

findFreePort(3000, (freePort) => {
    app.listen(freePort, () => {
        console.log(`Сервер запущен на порту ${freePort}`);
    });
});
