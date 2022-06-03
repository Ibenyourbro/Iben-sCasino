const express = require('express');

const path = require('path');
const app = express();
const session = require('express-session');

//const cookieParser = require('cookie-parser');
const passport = require('passport');
const authenticate = require('./authenticate.js');
const { Data } = require('./routes/userDatabase');
const { Poker } = require('./routes/poker/poker');

require('dotenv').config();
const { ClientId } = require('./routes/clientId');
const blj = require('./routes/blackjack');
const { conversation } = require('./routes/conversation');
const { message } = require('./routes/message');
const { Profile } = require('./routes/profile');

const port = 1337;

app.use(express.json());

const frontend = path.resolve(__dirname, '..', 'client', 'dist');

app.use(express.static(frontend));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/routes/clientId', ClientId);
app.use('/routes/blackjack', blj.Blackjack);
app.use('/routes/userDatabase', Data);
app.use('/routes/profile', Profile);
app.use('/routes/poker/poker', Poker);
app.use('/routes/conversation', conversation);
app.use('/routes/message', message);

app.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {}
);

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res, next) {
    // Successful authentication, redirect home.
    //res.redirect('/blackjack');// --> to the main game page
    res.redirect('/profile');
    // res.sendStatus(201)

    // res.send(req.user);
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontend, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});
