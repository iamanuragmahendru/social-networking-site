const route = require('express').Router()
const User = require('../db').User
const ProfilePic = require('../db').ProfilePic
const passport = require('../passport')

route.get('/', (req, res) => {
  if(req.user) {
    res.redirect('/users')
  } else {
    res.render('index', {
      title: 'Social Network',
      layout: 'layoutLoginPage.hbs'
    });
  }
});

route.get('/signup', (req, res) => {
  res.redirect('/')
})

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
/*     ProfilePic.create({
      profilePicName: 'profile_avatar_1.jpg'
    }) */
    res.render('newSignup', {
      title: 'Welcome to Social Network',
      layout: 'layoutLoginPage',
      username: user.firstName
    })
  }).catch((err) => {
    console.log(err)
    res.status(501).send({
      error: "Could not add new user"
    })
  })
})

route.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err)
    }
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, function (err) {
      
      if (err) {
        console.log(err)
        return next(err)
      }
      // Temporary soln used as req.user always updated to uid 1
      // Problem solved in passport deserializeUser

      //req.session.user = user
      return res.redirect('/users/' + user.uid);
    });
  })(req, res, next);
});

route.get('/login', (req, res) => {
  res.render('Login', {
    title: 'Social Network',
    layout: 'layoutLoginPage.hbs'
  });
});

route.get('/forgotpassword', (req, res) => {
  res.render('forgotPassword', {
    title: ' Forgot Password - Social Network',
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
        <a href="/forgotpassword">Go back </a>`)
    } else if (user.dob != req.body.DOB) {
      res.send(`
      <script>
          alert('Incorrect DOB')
      </script>
      <a href="/forgotpassword">Go back </a>`)
    } else {
      console.log('User verified')
      res.send(`
      <script>
          alert('Check your email for new password')
      </script>
      <a href="/">Go Back to Main Page</a>`)
    }
  }).catch((err) => {
    console.log(err)
    return done(err)
  })
})

route.get('/notauthorised', (req, res) => {
  res.render('notAuthorized', {
    title: 'Error - Social Network',
    layout: 'layoutLoginPage'
  })
})

//TODO

//To implement Remember Me functionality

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
