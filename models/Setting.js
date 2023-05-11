const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({

    start: {
        type: String,
        required: true
    },

    end: {
        type: String,
        required: true
    },

    local_server: {
        type: String,
        required: false
    },

    check_printer: {

        name: {
            type: String,
            required: true
        },

        driverName: {
            type: String,
            required: true
        },

        width: {
            type: Number,
            required: true
        },

        height: {
            type: Number,
            required: true
        }

    }


})

module.exports = mongoose.model('settings', SettingsSchema)