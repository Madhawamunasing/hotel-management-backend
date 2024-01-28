var Sequelize = require('sequelize')
const db = require('../models')
const Refferal = db.refferals
const Customergrade = db.customergrades
var Sequelize = require('sequelize')
var sequelize = require('sequelize')
const crypto = require('crypto')
const createRefferal = async (req, res) => {
  const token = crypto.randomBytes(16).toString('hex')
  let info = {
    token: token,
    userId: req.body.userId,
  }
  await Refferal.create(info)
    .then((refferal) => res.status(200).send(refferal))
    .catch((err) => res.status(500).send(err))
}

const refferalValidate = async (req, res) => {
  let token = req.query.token
  await Refferal.findOne({ where: { token: token } })
    .then((data) => {
      console.log(data.userId)

      if (data != null) {
        updateCustomerGrade(data.userId)
        res.status(200).send(true)
      } else {
        res.status(200).send(false)
      }
    })
    .catch((err) => {
      res.status(200).send(err)
    })
}
// update customer grade and add points
const updateCustomerGrade = (userId) => {
  let amountToPoint = 50
  Customergrade.findOne({
    where: { customerId: userId },
  }).then((data) => {
    if (data == null) {
      // new user -> create new customer grade
      let info = {
        points: amountToPoint,
        rank: selectGrade(1000),
        customerId: userId,
      }
      Customergrade.create(info).then((data) => {
        console.log(data)
      })
    } else {
      console.log('Existing customer')
      let existingPoints = data.points
      let newPoints = existingPoints + amountToPoint
      let newRank = selectGrade(newPoints)
      Customergrade.update(
        { rank: newRank, points: newPoints },
        { where: { customerId: userId } }
      )
    }
  })
}

const selectGrade = (points) => {
  if (points < 1000) {
    return 'Club Vision Red'
  } else if (points < 2000) {
    return 'Bronze'
  } else if (points < 3000) {
    return 'Brone'
  } else if (points < 4000) {
    return 'Silver'
  } else if (points < 5000) {
    return 'Gold'
  } else {
    return 'Platinum'
  }
}
module.exports = {
  createRefferal,
  refferalValidate,
}
