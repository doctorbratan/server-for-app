const Settings = require('../models/Setting');
const moment = require('moment');

module.exports = async () => {

    const now = moment().format();

    const time = moment(now).format('HH:mm');
    const date = moment(now).format('YYYY-MM-DD');

    

    const settings = await Settings.findOne();

    let shift = 
    {
        access: null,
        date: null
    }

    if (time < settings.start) {
        const subtract = moment().subtract(1, 'days');
        shift.date = subtract.format('YYYY-MM-DD')
    } else {
        shift.date = date
    }

    if (settings.end > settings.start) {

        if (settings.start <= time && time <= settings.end) {

            shift.access = true
            return shift
        } 

        else {
            shift.access = false
            return shift
        }

    } else {

        if (settings.end < time && time < settings.start) {
            shift.access = false
            return shift
        } else {
            shift.access = true
            return shift
        }

    }


}