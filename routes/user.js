
const router      = require('express').Router()
const bodyParser  = require('body-parser')

module.exports = (passport) => {

  // -> Account Authorization <- //

  // Login
  router.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') })
  })

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/user/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }))

  // Register
  router.get('/register', (req, res) => {
    res.render('register.ejs', { message: req.flash('signupMessage') })
  })

  router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/user/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }))

  // FACEBOOK ===============================
  // route for facebook authentication and login
  router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/landingPage'
  }))

  // LOGOUT ==============================
  router.get('/logout', (req, res) => {
      req.logout()
      res.redirect('/landingPage')
  })


  // -> USER HANDLERS <- //

  // PROFILE SECTION =========================
  router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
        user : req.user
    })
  })

  // Login Checker
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/')
  }

  return router

}
