
const router         = require('express').Router()
const bodyParser     = require('body-parser')
const bcrypt         = require('bcrypt')
const passport       = require('passport')
const LocalStrategy  = require('passport-local').Strategy
const flash          = require('connect-flash')
const cookieSession  = require('cookie-session')

router.use(passport.initialize())
router.use(passport.session())
router.use(flash())
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


module.exports = (db, User) => {

  // Passport Serialize Functions
  passport.serializeUser((user, done) => {
    console.log(`serializing user: ${user}`)
    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      console.log(`deserializing user: ${user}`)
      done(err, user)
    });
  });

  // Passport Registration Logic
  passport.use('register', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }

  			// already exists
  			if (user) {
  					console.log(`User already exists with username: ${username}`);
  					return done(null, false, req.flash('message','User Already Exists'));
  			} else {
  				// create the user if there is no user with that email
  				var newUser = new User()
  				newUser.username = username
  				newUser.email = req.body.email
  				newUser.password = bcrypt.hashSync(req.body.password, 10)

  				// save the user
  				newUser.save((err) => {
  						if (err){
  								console.log(`Error in Saving user: ${err}`)
  								throw err;
  						}
  						console.log('User Registration succesful')
  						return done(null, newUser);
  				})
  			}
      })
    }
  ))

  // Passport Login Logic





  // -> Routes <- //

  router.get("/register", (req, res) => {
    res.render('./register')
  })

  router.post("/register", passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash : true
  }));

  router.get("/login", (req, res) => {
    res.render('./login')
  })


  return router
}
