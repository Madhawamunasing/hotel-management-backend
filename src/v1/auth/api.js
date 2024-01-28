const db = require('../api/models')
const bcrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const genarateAccessToken = require('./authentication.js').genarateAccessToken

const User = db.users
const Role = db.roles
const Customergrade = db.customergrades

const login = async (req, res) => {
  let email = req.body.email
  let password = req.body.password

  await User.findOne({
    where: { email: email },
    include: [
      {
        model: Role,
      },
    ],
  })
    .then(async (user) => {
      console.log(user)

      if (user == null) {
        res.status(200).send('Cannot find user')
      } else {
        if (await bcrpt.compare(password, user.password)) {
          const loggedUser = { name: email }
          const accessToken = genarateAccessToken(loggedUser)
          const refreshToken = jwt.sign(
            loggedUser,
            process.env.REFRESH_TOKEN_SECRET
          )
          await User.update(
            {
              refreshToken: refreshToken,
            },
            { where: { email: email } }
          )
            .then(() => {
              res.json({
                status: true,
                accessToken: accessToken,
                refreshToken: refreshToken,
                userId: user.uId,
                currency: user.currency,
                admin: user.role.admin,
                hotelAdmin: user.role.hotelAdmin,
                customer: user.role.customer,
              })
            })
            .catch((err) => {
              res.status(200).send(err)
            })
        } else {
          res.status(200).send({ status: false })
        }
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
// Add user
const addUser = async (req, res) => {
  //bcrtpy password

  const salt = await bcrpt.genSalt()
  const hashedPassword = await bcrpt.hash(req.body.password, salt)

  let info = {
    email: req.body.email,
    contactNo: req.body.contactNo,
    firstName: req.body.fName,
    lastName: req.body.lName,
    password: hashedPassword,
    province: req.body.province,
    district: req.body.district,
    street1: req.body.street1,
    street2: req.body.street2,
    image: req.body.image,
  }

  await User.create(info)
    .then((user) => {
      let roleInfo = {
        admin: 0,
        hotelAdmin: 0,
        customer: user.uId,
      }
      user
        .createRole(roleInfo)
        .then((data) => {
          let info = {
            points: 0,
            rank: 'Club Vision Red',
            customerId: user.uId,
          }
          Customergrade.create(info).then((data) => {
            console.log(data)
          })
          res.status(200).send(user)
        })
        .catch((err) => {
          res.status(500).send(err)
        })
    })
    .catch((err) => {
      res.status(200).send(false)
    })
}

const logout = (req, res) => {
  //delete refreshtoken in database
  res.json({ status: 'logout' })
}
module.exports = { login, addUser, logout }
