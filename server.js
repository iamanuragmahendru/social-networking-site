const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./passport');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;

// Defining the various routes to handle traffic

const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const profileRoute = require('./routes/profiles');
const adminRoute = require('./routes/admin');
const apiRoute = require('./routes/api');

// View engine setup

let handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'layout',
    extname: 'hbs'
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));


// To use session, body parser post req, passportjs and handle cookies

app.use('/public', express.static('public'));
app.use(cookieParser('keyboard cat'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Handle the requests

app.use('/', indexRoute);
app.use('/api',  apiRoute);
app.use('/users', userRoute);
app.use('/profiles', profileRoute);
app.use('/admin', adminRoute);

// Socket.io Chat

let usersockets = {};

io.on('connection', (socket) => {
  
    socket.emit('connected');
    /* socket.on('disconnect', function(){
        console.log('user disconnected');
      }); */
    
    socket.on('change_user', (data) => {
        // username is in data.user
        usersockets[data.user] = socket.id;
        console.log(usersockets)
    });
    
    socket.on('send_msg', (data) => {

        if (data.message.startsWith('@')) {
            //data.message = "@a: hello"
            // split at :, then remove @ from beginning
            let recipient = data.message.split(':')[0].substr(1);
            let rcptSocket = usersockets[recipient];
            io.to(rcptSocket).emit('recv_msg', data)
        } else {
            io.emit('recv_msg', data)            
        }
    });

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {
        user: data.user
      })
    })

});

// To start the server and listen at the  given port

server.listen(PORT, () => console.log('Social app listening on : http://localhost:' + PORT));
