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
/* route.post('/login', (req, res) => {
  let pass= req.body.password
  User.findOne({
    where: {username: req.body.username}
  })
  .then((user) => {
    if (!user) {
        res.send('No such user');
    } else if (!user.validPassword(pass)) {
        res.send('Wrong Password');
    } else {
        //req.session.user = user.dataValues;
        res.send('hello' + user.firstName);
    }
  })
  .catch((err) => {
    console.log(err)
    res.status.send("Not able to retrieve user")
  })
}) */

route.post('/login', passport.authenticate('local', {
  failureRedirect: '/notlogin',
  successRedirect: '/loggedin'
}))
module.exports = route;