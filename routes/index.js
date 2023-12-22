const express = require('express');

const router = express.Router();
// const homeController = require('../controllers/home_contolller');
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/',passport.checkAuthentication,userController.home);

router.get('/sign-up', userController.signUp);

router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);

router.get('/sign-out', userController.destroySession);

router.get('/addYourHouse', userController.addYourHouse);

router.post('/addNewHouse', userController.addNewHouse);

router.post('/findHouse', userController.findHouses);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate('local',
  {
    failureRedirect: '/sign-in',
  }), userController.createSession);

module.exports = router;