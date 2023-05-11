const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    login: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },

    name: { 
        type: String, 
        required: true
    },

    check_name: {
        type: String,
        default: "Отсутствует"
    },

    status: { 
        type: String, 
        required: true 
    },

    access: {
        type: Boolean, 
        required: true, 
        default: true 
    },

    shift: {
        type: [String],
        default: []
    },

    enters: {
        type: [String],
        default: []
    },

    visible: { 
        type: Boolean, 
        default: true 
    }

})


module.exports = mongoose.model('users', userSchema)