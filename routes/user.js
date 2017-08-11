
const router      = require('express').Router()
const bodyParser  = require('body-parser')
const bcrypt      = require('bcrypt');


module.exports = (db, User) => {

  router.get("/register", (req, res) => {
    res.render('./register')
  })

  router.post("/register", (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = bcrypt.hashSync(req.body.password, 10)
    // let hashedPassword = bcrypt.hashSync(password, 10);

    

  })

  router.get("/login", (req, res) => {
    res.render('./login')
  })


  return router
}
