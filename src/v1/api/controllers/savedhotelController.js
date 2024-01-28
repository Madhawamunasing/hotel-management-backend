const db = require('../models')
const bcrpt = require('bcrypt')

const Savedhotels = db.savedhotels
const Room = db.rooms

//save room
const saveHotel = async (req, res) => {
  let info = {
    customerId: req.body.customerId,
    hotelId: req.body.hotelId,
  }
  await Savedhotels.create(info)
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      if ((err.name = 'SequelizeUniqueConstraintError')) {
        res.status(200).send('saved')
      } else {
        res.status(500).send('err')
      }
    })
}

//reserver saved room
const reserveSavedBooking = async (req, res) => {
  let hotelId = req.body.hotelId
  let customerId = req.body.customerId

  await Room.findOne({ where: { hotelId: hotelId } })
    .then(async (room) => {
      console.log(room)
      await Savedhotels.destroy({
        where: { hotelId: hotelId, customerId: customerId },
      })
        .then((data) => {
          if (data != 0) {
            res.status(200).send(room)
          } else {
            res.status(200).send('Error')
          }
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
const getSavedhotelByCustomerId = async (req, res) => {
  let id = req.body.id
  let room = await Savedhotels.findAll({ where: { customerId: id } })
  res.status(200).send(room)
}
//  Delete saved room by ID
const deleteSavedBooking = async (req, res) => {
  console.log('As')
  let hotelId = req.params.hotelId
  let customerId = req.params.customerId
  await Savedhotels.destroy({
    where: { hotelId: hotelId, customerId: customerId },
  })
    .then((data) => {
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

module.exports = {
  saveHotel,
  reserveSavedBooking,
  deleteSavedBooking,
  getSavedhotelByCustomerId,
}
