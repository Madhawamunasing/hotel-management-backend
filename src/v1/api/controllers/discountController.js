const db = require('../models')
const Discount = db.discounts
const { Op } = require('sequelize')
// Add discount
const createDiscount = async (req, res) => {
  let info = {
    discount: req.body.discount,
    validTill: req.body.validTill,
    hotelHotelId: req.body.hotelId,
  }
  await Discount.findAll({
    where: {
      createdAt: {
        [Op.lte]: new Date(),
      },
      validTill: {
        [Op.gte]: new Date(),
      },
      hotelHotelId: req.body.hotelId,
    },
  })
    .then((data) => {
      // console.log(data)
      // res.status(200).send(data)
      if (data.length != 0) {
        console.log('Already added discount')
        res.status(200).send('Already added discount')
      } else {
        Discount.create(info)
          .then((discount) => res.status(200).send(discount))
          .catch((err) => {
            console.log(err)
            res.status(500).send(err)
          })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

// Get all discounts
const getAllDiscount = async (req, res) => {
  await Discount.findAll({})
    .then((discounts) => res.status(200).send(discounts))
    .catch((err) => {
      res.status(500).send(err)
    })
}

//Get discount by hotel ID
const getDiscountByHotelId = async (req, res) => {
  let id = req.body.id
  await Discount.findOne({
    where: { hotelHotelId: id },
  })
    .then((discount) => res.status(200).send(discount))
    .catch((err) => {
      res.status(500).send(err)
    })
}

// Delete discount by id
const deleteDiscountyById = async (req, res) => {
  let id = req.params.id
  await Discount.destroy({ where: { discountId: id } })
    .then((data) => {
      if (data != 0) {
        res.status(200).send('Success')
      } else {
        res.status(200).send('Failed')
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
module.exports = {
  createDiscount,
  getAllDiscount,
  getDiscountByHotelId,
  deleteDiscountyById,
}
