// Environment Variables
require('dotenv').config();
const secret = process.env.SwagShopSecret,
const environment = process.env.SwagShopEnv,
const port = process.env.SwagShopPort


// Express Setup
const express = require('express');
const app = express();


// Express Session Setup
const session = require('express-session');
const store = new session.MemoryStore();

const sessionOptions = {
  cookie: { maxAge: 3600000 },
  saveUninitialized: false,
  resave: false,
  secret,
  store: new MemoryStore({
    checkPeriod: 3600000
  })
};

if (environment === 'production') {
  app.set('trust proxy', 1);
  sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));


// Middleware
app.use(express.json());


// Routers
app.use('/users', require('./routers/users.js'));


// Listen
app.listen(port);
console.log(`Listening on port ${port}...`);
