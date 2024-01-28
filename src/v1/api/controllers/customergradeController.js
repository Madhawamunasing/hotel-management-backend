const db = require('../models')
const CustomerGrade = db.customergrades

const getCustomerDiscount = async (req, res) => {
  let userId = req.body.userId
  let amount = req.body.amount
  await CustomerGrade.findOne({ where: { customerId: userId } })
    .then((data) => {
      let reward = 0
      if (data != null) {
        reward = findDiscount(amount, data.points)
      }
      res.status(200).send(reward.toString())
    })
    .catch((err) => {
      console.log(err)
    })
}
const findDiscount = (amount, points) => {
  if (points < 1000) {
    return amount * 0.05
  } else if (points < 2000) {
    return amount * 0.07
  } else if (points < 4000) {
    return amount * 0.09
  } else {
    return amount * 0.15
  }
}
//Get getCustomerGrade
const getCustomerGrade = async (req, res) => {
  let id = req.body.id
  await CustomerGrade.findOne({
    where: { customerId: id },
  })
    .then((usergrade) => {
      res.status(200).send(usergrade)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
module.exports = { getCustomerDiscount, getCustomerGrade }
