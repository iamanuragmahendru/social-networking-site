const route = require('express').Router()
const User = require('../db').User
// const passport = require('../passport')

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

/* route.post('/signup', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  })
  .then((user) => {
    res.send("User created")
  })
  .catch((err) => {
    console.log(err)
    res.send("Could not add new user")
  })
})
 */
route.post('/login', (req, res) => {
  var passkey;
  User.findOne({
    where: {username: req.body.username}
  })
  .then((user) => {
      passkey = user.password
      console.log(passkey)
      if(req.body.password == passkey)
        res.status(201).send("Hello user")
      else  
      res.status(201).send("Not Found")
  })
  .catch((err) => {
    res.status.send("Not able to retrieve user")
  })
})

module.exports = route;