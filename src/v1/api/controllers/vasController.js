const db = require('../models')
const VAS = db.vas
const Hotel = db.hotels
const Booking = db.bookings
const dbConfig = require('../../../../config/dbConfig.js')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle,
  },
})
const createVAS = async (req, res) => {
  let info = {
    name: req.body.name,
    rate: req.body.rate,
  }
  let hotelId = req.body.hotelId
  let hotelinfo = await Hotel.findOne({ where: { hotelId: hotelId } })
  await VAS.create(info)
    .then((vasinfo) => {
      vasinfo
        .addHotel(hotelinfo)
        .then((data) => {
          res.status(200).send(data)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send(err)
        })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

// Get all VAS
const getAllVAS = async (req, res) => {
  let roomtype = await VAS.findAll({
    include: [
      {
        model: Hotel,
      },
    ],
  })
  res.status(200).send(roomtype)
}

//Get VAS by ID
const getVASById = async (req, res) => {
  let id = req.body.id
  console.log(id)
  let room = await VAS.findOne({
    where: { vasId: id },
    include: [
      {
        model: Hotel,
      },
    ],
  })
  res.status(200).send(room)
}

//  update VAS by ID
const updateVASById = async (req, res) => {
  let id = req.params.id
  await VAS.update(req.body, { where: { vasId: id } })
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//  Delete VAS by ID
const deleteVASById = async (req, res) => {
  let id = req.params.vasId
  await VAS.destroy({ where: { vasId: id } })
    .then((data) => {
      console.log(data)
      if (data != 0) {
        res.status(200).send('Success')
      } else {
        res.status(200).send('Error')
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
//  Delete VAS by ID and booking id
const deleteVASByBookingAndVASId = async (req, res) => {
  let vasId = req.params.vasId
  let bookingId = req.params.bookingId
  console.log(
    `DELETE FROM  WHERE booking_vas=${vasId} and vaVasId =${bookingId}`
  )
  await sequelize
    .query(
      `DELETE FROM booking_vas WHERE vaVasId =${vasId} and bookingBookingId =${bookingId}`
    )
    .then((data) => {
      if (data != 0) {
        res.status(200).send('sucess')
      } else {
        res.status(200).send('Error')
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
//Get VAS by hotel ID
const getVASByHotelId = async (req, res) => {
  let id = req.body.id
  console.log(id)
  await VAS.findAll({
    include: [
      {
        model: Hotel,
        where: { hotelId: id },
      },
    ],
  })
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
const getVASByBookingId = async (req, res) => {
  let id = req.body.id
  console.log(id)
  await VAS.findAll({
    include: [
      {
        attributes: [],
        model: Booking,
        where: { BookingId: id },
      },
    ],
  })
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
module.exports = {
  createVAS,
  getAllVAS,
  getVASById,
  updateVASById,
  deleteVASById,
  getVASByHotelId,
  getVASByBookingId,
  deleteVASByBookingAndVASId,
}
