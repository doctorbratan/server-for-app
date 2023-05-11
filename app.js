// Подключаю все бибилеотеки
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// Подключаю все бибилеотеки



// Роуты
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// const categoriesRoutes = require('./routes/categories');
// const positionsRotues = require('./routes/positions');

// const customerRoutes = require('./routes/customers');

// const orderOpenRoutes = require('./routes/order-open');

// const writeOffRoutes = require('./routes/writeOffs');
// const personalCardRoutes = require('./routes/personal_cards');
// const paymentRoutes = require('./routes/payments');
// const storageRoutes = require('./routes/storage');
// const settingsRoutes = require('./routes/settings');

// const statisticRoutes = require('./routes/statistics');
// const telegramRoutes = require('./routes/telegram');

// Роуты

const keys = require('./config/keys');
const app = express();


// Подключение к локальной БД
mongoose.connect(
    keys.mongoURI,
    {
        useCreateIndex: true,
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false

    }
    )
.then(() => console.log('База данных подключенна!'))
.catch(err => console.log(err));


// Использовать паспорт
app.use(passport.initialize());
require('./middleware/passport')(passport);

// Показывает API запросы
app.use(morgan('dev'));
app.use(cors());

// Расшифровка приходящих данных
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Ссылки отслеживаемых роутов
    //Роут авторизации и доступа
    app.use('/api/auth', authRoutes);

    //Роут управление пользователями
    app.use('/api/user', userRoutes);

    //Роут Заказа
    // app.use('/api/order-open', orderOpenRoutes);


    //Роут Статистики
    // app.use('/api/statistic', statisticRoutes);

    //Роут Cписаний
    // app.use('/api/writeOff', writeOffRoutes);

    //Роут Склада
    // app.use('/api/storage', storageRoutes);

    //Роут Персональных Карт
    // app.use('/api/personal-card', personalCardRoutes);

    //Роут Платежа
    // app.use('/api/payment', paymentRoutes);
    //Роут Настроек Магазина
    // app.use('/api/settings', settingsRoutes);


    //Роут Категорий
    // app.use('/api/category', categoriesRoutes);
    //Роут Позиций
    // app.use('/api/position', positionsRotues);
    //
    // app.use('/api/customer', customerRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
       res.sendFile(
           path.resolve(
               __dirname, 'client', 'dist', 'client', 'index.html'
           )
       )
    })
} 
   
   
module.exports = app;

