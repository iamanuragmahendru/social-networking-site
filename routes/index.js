const route = require('express').Router()
const User = require('../db').User
const passport = require('../passport')

route.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Social Network',
    layout: 'layoutLoginPage.hbs'
  });
});

route.post('/signup', (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.inputUsername,
    password: req.body.inputPassword,
    gender: req.body.genderOptions,
    dob: req.body.DOB,
    city: req.body.userCity,
    state: req.body.userState,
    pincode: req.body.userPin
  }).then((user) => {
    res.status(201).send(user)
  }).catch((err) => {
    console.log(err)
    res.status(501).send({
      error: "Could not add new user"
    })
  })
})

route.post('/login', passport.authenticate('local', {
  failureRedirect: '/notlogin',
  successRedirect: '/loggedin'
}))

module.exports = route;
