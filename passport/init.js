const login    = ('./login')
const register = ('./register')

module.exports = (passport, User) => {

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

  login(passport, User)
  register(passport, User)

}
