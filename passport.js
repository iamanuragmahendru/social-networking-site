const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./db').User;

passport.serializeUser(function (user, done) {
    done(null, user.uid)
});

passport.deserializeUser(function (userId, done) {
    User.findOne({
        where: {
            uid: userId
        }
    }).then((user) => {
        if (!user) {
            return done(new Error("No such user"))
        }
        return done(null, user)
    }).catch((err) => {
        done(err)
    })
});

passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({
      where: {
          username: username
      }
  }).then((user) => {
      if (!user) {
          return done(null, false, {message: "No such user"});
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
  }).catch((err) => {
      console.log(err);
      return done(err)
  })
}));

module.exports = passport;