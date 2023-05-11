const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const shiftHandler = require('../utils/shift');

//const request = require('request');
const moment = require('moment');



module.exports.login = async (req, res) => {
    const candidate = await User.findOne({login: req.body.login});
    const shiftResponse = await shiftHandler();
    const date_message = moment().format('HH:mm DD/MM/YYYY');

    if (candidate) {
        // Пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Пароли совпали
            if ( candidate.status === "seller" ) {
                const today = shiftResponse.date
                const today_access = candidate.shift.find( data => data === today)
                
                if (today_access && shiftResponse.access && candidate.access) {
                    
                    // В Массив Входов
                    await User.findOneAndUpdate(
                        {_id: candidate._id},
                        { $push: { enters: { $each: [`Вход выполнен: ${moment().format("HH:mm  DD/MM/YYYY")}`], $position: 0 } } }
                    )


                    // Если есть сегодняшняя смена
                    const token = jwt.sign({
                        userID: candidate._id
                    }, keys.jwt , {expiresIn: 60 * 480})

                    /*   
                    request({
                        url: '',
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        json: {
                            message: `В систему зашел пользователь: ${candidate.name}, Время: ${date_message}. IP: ${req.body.ip}`
                        }
                    })
                    */
                    
                    res.status(200).json({
                        message: 'Успешно!',
                        token: `Bearer ${token}`,
                        user: candidate
                    })

                } else {

                    // В Массив Входов
                    await User.findOneAndUpdate(
                        {_id: candidate._id},
                        { $push: { enters: { $each: [`Попытка вне смены: ${moment().format("HH:mm  DD/MM/YYYY")}`], $position: 0 } } }
                    )

                    /* 
                    request({
                        url: '',
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        json: {
                            message: `Вне смены пытался зайти пользователь: ${candidate.name}, Время: ${date_message}. IP: ${req.body.ip}`
                        }
                    }) 
                    */

                
                    res.status(401).json({message: 'Отказанно в доступе!'})
                }
            } else {
                const token = jwt.sign({
                    userID: candidate._id
                }, keys.jwt , {expiresIn: 60 * 120})
                
                res.status(200).json({
                    message: 'Успешно!',
                    token: `Bearer ${token}`,
                    user: candidate
                })
            }
        } else {
            
            // В Массив Входов
            await User.findOneAndUpdate(
                {_id: candidate._id},
                { $push: { enters: { $each: [`Неверный Пароль: ${moment().format("HH:mm  DD/MM/YYYY")}`], $position: 0 } } }
            )    

            /* 
            request({
                url: '',
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                json: {
                    message: `Неверный пароль ввел пользователь: ${candidate.name}, Время: ${date_message}. IP: ${req.body.ip}`
                }
            }) 
            */
            
            res.status(401).json({message: 'Неверный пароль!'})
        }
    }  else {

        /* 
        request({
            url: '',
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            json: {
                message: `В систему пытался зайти неизвестный пользователь: ${req.body.login}, Время: ${date_message}. IP: ${req.body.ip}`
            }
        }) 
        */

        res.status(401).json({message: 'Неверный логин!'})
    }
}



module.exports.auth = async (req, res) => {
    try {

        const user = {
            _id: req.user.id,
            name: req.user.name,
            check_name: req.user.check_name,
            status: req.user.status
        }

        res.status(200).json(user)

    } catch (e) {
        errorHandler(res, e)
    }
}


