const passport = require('passport')
const passportLocalStrategy = require('passport-local'),Strategy
const Users = require('./db').Users

passport.serializeUser(function (user, done) {
    done(null, user.username)
})

passport.deserializeUser(function (username, done) {
    Users.findOne({
        username: username
    }).then((user) => {
        if(!user) {
            return (new Error("No such user"))
        }
        return (done(null, user))
    }).catch((err) => {
        done(err)
    })
})