
const router      = require('express').Router()
const bodyParser  = require('body-parser')
const bcrypt      = require('bcrypt');


module.exports = (User) => {

  router.get("/register", (req, res) => {
    res.render('./register')
  })

  router.post("/register", (req, res) => {

    let user = new User
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
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


  return router
}
