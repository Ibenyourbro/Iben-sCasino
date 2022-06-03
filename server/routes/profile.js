const Profile = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user not logged in
    res.redirect('/login');
  } else {
    next();
  }
};

Profile.get('/user', authCheck, async (req, res) => {
  //req.user is provided with the serialize/deserialize sessions

  // console.log(req.user);
  // console.log(req.session.passport.user)

  //if (req.user) {

  /**
   * this is just sending back the user name to get this off the ground, you are going to want to get the req.user to have access to other info you may want to display on the front end profile
   */
  res.status(201).send(req.user);
  // } else {
  //a case for if no user, although maybe if not logged in this should just be redirected to the login page
  //res.status(201).send('anon');
  //}
});

module.exports = { Profile };
