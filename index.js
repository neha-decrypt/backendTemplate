require('dotenv').config()
const express = require('express'),
    socketio = require('socket.io'),
    router = require('./routes.js'),
    cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");


var app = express();

app.use(cookieParser());
var io = socketio(server);

const session = require('express-session');
const RedisStore = require("connect-redis")(session)
const redisClient = require('./redis/redis.js')



function errorHandler(error, request, response, next) {
    console.error(error);
    response.status(500).send({ message: 'An error occurred' });
}

const redisStore = new RedisStore({
    client: redisClient.client,
    disableTouch: true,
    prefix: "ostraApp:",
    ttl: process.env.SESSION_EXPIRY
});

// Configure the express-session middleware to use RedisStore
app.use(session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    limit: "16mb",
    extended: true,
    parameterLimit: 50000,
}))
app.use(errorHandler)
app.use('/', router);



io.on('connection', (socket) => {
    socket.broadcast.emit('user.events', 'Someone has joined!');
    socket.on('name', (name) => {

    });

    socket.on('disconnect', () => {

    });
});

var server = app.listen(3000, async () => {
    console.log("Running on port 3000")
});

