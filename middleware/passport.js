const keys = require('../config/keys');
const shiftHandler = require('../utils/shift');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

const select = "id name check_name status access"

module.exports = passport => {

    passport.use( 'seller-access',
        new JwtStrategy(options, async (payload, done) => {
            try {
                let user = await User.findById(payload.userID).select(select)
                const shift = await shiftHandler()
                if (user) {
                    user.session = shift.date
                }

                if (user && user.status === "seller" && user.access && shift.access  || user && user.status === "admin" || user && user.status === "boss" ) {
                    done(null, user)
                } else {
                    done(null, false)
                }

            } catch (err) {
                console.log(err)
            }
        })
    ),


    passport.use( 'admin-access',
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userID).select(data);

                if (user && user.status === "admin" || user && user.status === "boss") {
                    done(null, user)
                } else {
                    done(null, false)
                }

            } catch (err) {
                console.log(err)
            }
        })
    )

    passport.use( 'boss-access',
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await User.findById(payload.userID).select(data)

            if (user && user.status === "boss") {
                done(null, user)
            } else {
                done(null, false)
            }

        } catch (err) {
            console.log(err)
        }
    })
)


}