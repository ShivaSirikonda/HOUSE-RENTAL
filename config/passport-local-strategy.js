const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Adjust the path to your user model

// Authentication using Passport
passport.use(new LocalStrategy({
  usernameField: 'email',
}, function(email, password, done) {
  // Find the user and establish the identity
  User.findOne({ email: email })
  .then(function (user) {
    if (!user || user.password !== password) {
      return done(null, false, { message: 'Invalid username/password' });
    }

    return done(null, user);
  })
  .catch(function (err) {
    return done(err);
  });
}));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
  User.findById(id)
  .then(function (user) {
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    return done(null, user);
  })
  .catch(function (err) {
    return done(err);
  });
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/sign-in');
};

// Middleware to set authenticated user for views
passport.setAuthenticatedUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
