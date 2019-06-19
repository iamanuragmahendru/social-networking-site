const express = require('express')
const path = require('path')
const app = express()
const session = require('express-session')
const passport = require('./passport')
const cookieParser = require('cookie-parser')
const port = 3000

// Defining the various routes to handle traffic

const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const profileRoute = require('./routes/profiles')
const adminRoute = require('./routes/admin')

// View engine setup

let handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'layout',
    extname: 'hbs'
});

app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "views"))


// To use session, body parser post req, passportjs and handle cookies

app.use('/public', express.static('public'))
app.use(cookieParser('keyboard cat'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// Handle the requests

app.use('/', indexRoute)
app.use('/users', userRoute)
app.use('/profiles', profileRoute)

// To start the server and listen at the  given port

app.listen(port, () => console.log(`Social app listening on port ${port}! http://localhost:3000`))