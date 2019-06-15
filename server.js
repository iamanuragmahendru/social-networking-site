const express = require('express')
const path = require('path')
const app = express()
const port = 3000
//const session = require('express-session')
//const passport = require('./passport')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//To use passportjs

// app.use(session({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// Defining the various routes
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')

// view engine setup
var handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: 'layout',
    extname: 'hbs'
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));

// Handle the requests
app.use('/public', express.static('public'))
app.use('/', indexRoute)

// To start the server and listen at the  given port
app.listen(port, () => console.log(`Social app listening on port ${port}! http://localhost:3000`))