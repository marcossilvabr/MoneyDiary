
const LocalStrategy    = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const User             = require('../models/user')
const configAuth       = require('./auth');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // -> Local Registration <- //
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },

  (req, email, password, done) => {
    if (email)
        email = email.toLowerCase() // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // if the user is not already logged in:
    if (!req.user) {
      User.findOne({ 'local.email' :  email }, (err, user) => {
          // if there are any errors, return the error
        if (err)
          return done(err)

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
        } else {
          // create the user
          let newUser = new User()

          newUser.local.email    = email
          newUser.local.password = newUser.generateHash(password)

          newUser.save((err) => {
            if (err)
              return done(err)

            return done(null, newUser)
          })
        }

      })
      // if the user is logged in but has no local account...
    } else if ( !req.user.local.email ) {
      // ...presumably they're trying to connect a local account
      // BUT let's check if the email used to connect a local account is being used by another user
      User.findOne({ 'local.email' :  email }, (err, user) => {
        if (err)
          return done(err);

        if (user) {
          return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
            // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
        } else {
          let user            = req.user
          user.local.email    = email
          user.local.password = user.generateHash(password)

          user.save((err) => {
            if (err)
              return done(err)

            return done(null,user)
          })
        }
      })
    } else {
      // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
      return done(null, req.user)
    }

  }));

  // -> Local Login <- //
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },

  (req, email, password, done) => {
    if (email)
        email = email.toLowerCase() // Use lower-case e-mails to avoid case-sensitive e-mail matching

      User.findOne({ 'local.email' :  email }, (err, user) => {
        // if there are any errors, return the error
        if (err)
          return done(err)

        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'))

        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))

        // all is well, return user
        else
          return done(null, user)
      })

  }))

  // -> Facebook Login <- //
  passport.use(new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL,
    profileFields   : configAuth.facebookAuth.profileFields

  },

  // facebook will send back the token and profile
  (token, refreshToken, profile, done) => {

        // find the user in the database based on their facebook id
      User.findOne({ 'facebook.id' : profile.id }, (err, user) => {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err)

        // if the user is found, then log them in
        if (user) {
          return done(null, user) // user found, return that user
        } else {

          // if there is no user found with that facebook id, create them
          let newUser            = new User()
          // set all of the facebook information in our user model
          newUser.facebook.id    = profile.id // set the users facebook id
          newUser.facebook.token = token // we will save the token that facebook provides to the user
          newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName // look at the passport user profile to see how names are returned
          newUser.facebook.email = profile.emails[0].value // facebook can return multiple emails so we'll take the first

          // save our user to the database
          newUser.save((err) => {
            if (err)
              throw err

            // if successful, return the new user
            return done(null, newUser)
          })
        }
      })

  }))

}
