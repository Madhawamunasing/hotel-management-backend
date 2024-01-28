const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = db.users
const Role = db.roles

// Get all users
const getAllUser = async (req, res) => {
  let users = await User.findAll({
    include: [
      {
        model: Role,
      },
    ],
  })
  res.status(200).send(users)
}

//Get user by ID
const getUserById = async (req, res) => {
  let id = req.body.id
  let user = await User.findOne({
    where: { uId: id },
    include: [
      {
        model: Role,
      },
    ],
  })
  res.status(200).send(user)
}

//  update user by ID

const updateUserById = async (req, res) => {
  let id = req.params.id
  const user = await User.update(req.body, { where: { uId: id } })
  res.status(200).send(user)
}

//  Delete user by ID
const deleteUserById = async (req, res) => {
  let id = req.params.id
  const status = await User.destroy({ where: { uId: id } })
    .then((data) => {
      if (status != 0) {
        res.status(200).send('Success')
      } else {
        res.status(200).send('Error')
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

const changePassword = async (req, res) => {
  let email = req.body.email
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(newPassword, salt)
  let changedPassword = {
    password: hashedPassword,
  }
  await User.findOne({ where: { email: email } })
    .then(async (user) => {
      if (user == null) {
        res
          .status(200)
          .send({ status: false, description: 'email is not existing' })
      } else {
        if (await bcrypt.compare(oldPassword, user.password)) {
          User.update(changedPassword, { where: { email: email } })
            .then((data) => {
              res.status(200).send({
                status: true,
                description: 'Password was change',
              })
            })
            .catch((err) => {
              console.log(err)
              res.status(500).send(err)
            })
        } else {
          res
            .status(200)
            .send({ status: false, description: 'old password is incorrect' })
        }
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
module.exports = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  changePassword,
}
