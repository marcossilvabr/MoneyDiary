
const router      = require('express').Router()
const bodyParser  = require('body-parser')
const bcrypt      = require('bcrypt');


module.exports = (db, User) => {

  router.get("/register", (req, res) => {
    res.render('./register')
  })

  router.post("/register", (req, res) => {
    // let firstName = req.body.firstName
    // let lastName = req.body.lastName
    // let email = req.body.email
    // let password = bcrypt.hashSync(req.body.password, 10)
    // let hashedPassword = bcrypt.hashSync(password, 10);

    let user = new User
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.password = bcrypt.hashSync(req.body.password, 10)

    user.save((err) => {
      if (err)
        res.send(err);

      
      res.redirect('./register');
    });

  })

  router.get("/login", (req, res) => {
    res.render('./login')
  })


  return router
}
