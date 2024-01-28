const db = require('../models')
const Coupon = db.coupons
var Sequelize = require('sequelize')
var sequelize = require('sequelize')
const Op = Sequelize.Op
const createCoupon = async (req, res) => {
  let info = {
    title: req.body.title,
    token: req.body.token,
    discount: req.body.discount,
    minimumTotal: req.body.minimumTotal,
    expireOn: req.body.expireOn,
    hotelId: req.body.hotelId,
  }
  await Coupon.create(info)
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
// Get all coupons
const getAllCoupons = async (req, res) => {
  await Coupon.findAll({})
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
// Get all coupons
const getAllCouponByHotelId = async (req, res) => {
  let hotelId = req.body.hotelId
  await Coupon.findAll({ where: { hotelId: hotelId } })
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//Get coupon by coupon ID
const getCouponByCouponId = async (req, res) => {
  let id = req.body.couponId
  let coupon = await Coupon.findAll({ where: { couponId: id } })
  res.status(200).send(coupon)
}

// validate coupon
const validateCoupon = async (req, res) => {
  let coupon = req.body.coupon
  let amount = req.body.amount
  let hotelId = req.body.hotelId
  let today = new Date()
  await Coupon.findAll({
    attributes: ['discount'],
    where: {
      token: coupon,
      hotelId: hotelId,
      minimumTotal: {
        [Op.lte]: amount,
      },
      expireOn: {
        [Op.gte]: today,
      },
    },
  }).then((response) => {
    if (response.length != 0) {
      res.status(200).send(response)
    } else {
      res.status(200).send(null)
    }
  })
}

//delete coupon by id
const deleteCouponById = async (req, res) => {
  let id = req.params.id
  const status = await Coupon.destroy({ where: { couponId: id } })
  if (status != 0) {
    res.status(200).send('Success')
  } else {
    res.status(200).send('Error')
  }
}
module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponByCouponId,
  validateCoupon,
  deleteCouponById,
  getAllCouponByHotelId,
}
