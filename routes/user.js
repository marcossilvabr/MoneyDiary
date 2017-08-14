
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


module.exports = (User) => {

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

  // Passport Login Logic
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        let isValidPassword = (user, password) => {
          return bcrypt.compareSync(password, user.password);
        }
        if (isValidPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));


  // -> Routes <- //

  router.get("/register", (req, res) => {
    res.render('./register')
  })

  router.post("/register", (req, res) => {

    let user = new User
    user.username = req.body.username
    user.email = req.body.email
    user.password = bcrypt.hashSync(req.body.password, 10)

    user.save((err) => {
      if (err)
        res.send(err);

      req.session.user_id = user['_id']
      res.redirect('./register');
    });

  })

  router.get("/login", (req, res) => {
    res.render('./login')
  })

  router.post("/login", passport.authenticate('local', {
    successRedirect: './cashflow',
    failureRedirect: './login',
    failureFlash: true
  }))

  return router
}
