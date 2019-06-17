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

route.post('/login',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/loginIncorrect',
  })
);

route.get('/loginIncorrect', (req, res) => {
  res.render('incorrectLogin', {
    title: 'Social Network',
    layout: 'layoutLoginPage.hbs'
  });
});

route.post('/loginIncorrect',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/loginIncorrect',
  })
);

route.get('/forgotpassword', (req, res) => {
  res.render('forgotPassword' , {
    title: 'Social Network - Forgot Password',
    layout: 'layoutLoginPage.hbs'
  });
})

route.post('/forgotpassword', (req, res) => {
  User.findOne({
    where: {
        username: req.body.username
    }
}).then((user) => {
    if (!user) {
        console.log('No such user')
        res.send(`
        <script>
            alert('No such User')
        </script>
        <a href="/forgotpassword">Go back </a>`
        )
    }
    else if (user.dob != req.body.DOB) {
      res.send(`
      <script>
          alert('Incorrect DOB')
      </script>
      <a href="/forgotpassword">Go back </a>`
      )
    }
    else {
      console.log('User verified')
      res.send(`
      <script>
          alert('Check your email for new password')
      </script>
      <a href="/">Go Back to Main Page</a>`
      )
    }
}).catch((err) => {
    console.log(err)
    return done(err)
})


})

/* route.post("/login", passport.authenticate('local',
    { failureRedirect: '/login',
      failureFlash: true }), function(req, res) {
        if (req.body.rememberCheck) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
          req.session.cookie.expires = false; // Cookie expires at end of session
        }
      res.redirect('/loggedin');
});
 */

module.exports = route;