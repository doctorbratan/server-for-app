const app = require('./app');
const moment = require('moment');
const server = require('http').createServer(app);

// Запуск сервера
console.log(moment().format());
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Сервер запушен на порту: ${port}`));



