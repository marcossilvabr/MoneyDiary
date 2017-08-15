
const router      = require('express').Router()
const bodyParser  = require('body-parser')
const bcrypt      = require('bcrypt-nodejs')


module.exports = (passport) => {

  // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    router.get('/login', (req, res) => {
      res.render('login.ejs', { message: req.flash('loginMessage') })
    });

    // process the login form
    // router.post('/login', passport.authenticate('local-login', {
    //   successRedirect : '/profile', // redirect to the secure profile section
    //   failureRedirect : '/login', // redirect back to the signup page if there is an error
    //   failureFlash : true // allow flash messages
    // }));

    // SIGNUP =================================
    // show the signup form
    router.get('/register', (req, res) => {
      res.render('register.ejs', { message: req.flash('signupMessage') })
    });

    // process the signup form
    // router.post('/register', passport.authenticate('local-signup', {
    //   successRedirect : '/profile', // redirect to the secure profile section
    //   failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //   failureFlash : true // allow flash messages
    // }));

    // LOGOUT ==============================
    router.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/landingPage')
    });

    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next()

      res.redirect('/')
    }

  return router
}
