const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


module.exports.get = async (req, res) => {
    try {

        let query = {visible: true}

        if (req.query.query) {
            query = JSON.parse(req.query.query)
            query.visible = true
        }

        const sort = req.query.sort ? JSON.parse(req.query.sort) : {}

        let select = {password: 0}

        if (req.query.select) {
            select = JSON.parse(req.query.select)
            select.password = 0
        }

        const users = await User.find(query).sort(sort).select(select)
        res.status(200).json(users)
    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.post = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(11);

        if (req.body.password) {

            if (req.body.password.length >= 4) {
                req.body.password = bcrypt.hashSync(req.body.password, salt)
            } else {
                res.status(500).json({
                    success: false,
                    message: "Пароль меньше 4 символов!"
                })
                return;
            }

        } else {
            res.status(500).json({
                success: false,
                message: "Некорректный пароль!"
            })
            return;
        }

        const user = await new User(req.body).save()
        res.status(201).json({message: "Пользователь создан!", user})

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.patch = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(11);
        if (req.body.password) {
            if (req.body.password.length >= 4) {
                req.body.password = bcrypt.hashSync(req.body.password, salt)
            } else {
                res.status(500).json({
                    success: false,
                    message: "Пароль меньше 4 символов!"
                })
                return;
            }
        } else {
            delete req.body.password;
        }

        const user = await User.findByIdAndUpdate(
            req.params._id,
            {$set: req.body },
            {new: true}
        )

        res.status(201).json({message: "Пользователь Изменен!", user})

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params._id)
        res.status(201).json({message: "Пользователь удален!"})
    } catch (e) {
        errorHandler(res, e)
    }
}