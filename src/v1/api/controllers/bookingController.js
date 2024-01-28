const db = require('../models')
const Booking = db.bookings
const VAS = db.vas
const Hotel = db.hotels
const Room = db.rooms
const User = db.users
const Role = db.roles
const Roominfo = db.roominfo

var Sequelize = require('sequelize')
var sequelize = require('sequelize')
const Op = Sequelize.Op

//new booking
const booking = async (req, res) => {
  let startDate = new Date(req.body.checkInDate)
  let endDate = new Date(req.body.checkOutDate)
  let reqRooms = req.body.noRooms

  await Booking.findOne({
    attributes: [
      ['roomRoomId', 'roomId'],
      [sequelize.fn('sum', sequelize.col('noRooms')), 'total'],
    ],
    group: ['roomRoomId'],
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            {
              checkInDate: {
                [Op.lte]: startDate,
              },
            },
            {
              checkOutDate: {
                [Op.gte]: startDate,
              },
            },
          ],
        },
        {
          [Op.and]: [
            {
              checkInDate: {
                [Op.lte]: endDate,
              },
            },
            {
              checkOutDate: {
                [Op.gte]: endDate,
              },
            },
          ],
        },
      ],
      roomRoomId: req.body.roomId,
    },
  })
    .then((BookingCount) => {
      let totalRooms = parseInt(reqRooms)
      if (BookingCount != null) {
        totalRooms += parseInt(BookingCount.dataValues.total)
      }
      Room.findOne({
        attributes: ['qty'],
        where: { roomId: req.body.roomId },
      })
        .then((roomQty) => {
          if (roomQty != null && roomQty.qty >= totalRooms) {
            Room.findOne({
              attributes: ['hotelHotelId'],
              where: { roomId: req.body.roomId },
            })
              .then(async (hotelId) => {
                let info = {
                  checkInDate: req.body.checkInDate,
                  checkOutDate: req.body.checkOutDate,
                  specialRequest: req.body.specialRequest,
                  arrivalTime: req.body.arrivalTime,
                  guestName: req.body.guestName,
                  rentCar: req.body.rentCar,
                  customerId: req.body.customerId,
                  roomRoomId: req.body.roomId,
                  hotelHotelId: hotelId.hotelHotelId,
                  noRooms: req.body.noRooms,
                  contactNo: req.body.contactNo,
                }
                let vasId = req.body.vasId
                let vasinfo = await VAS.findOne({ where: { vasId: vasId } })
                await Booking.create(info)
                  .then((booking) => {
                    booking
                      .addVas(vasinfo)
                      .then(async (data) => {
                        res.status(200).send(booking)
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
              })
              .catch((err) => {
                res.status(500).send(err)
              })
          } else {
            console.log('unavailable')
            res.status(200).send('unavailable')
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

// Get all bookings
const getAllBookings = async (req, res) => {
  await Booking.findAll({
    include: [
      {
        model: VAS,
      },
    ],

    order: [['bookingId', 'DESC']],
  })
    .then((bookings) => res.status(200).send(bookings))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//Get booking by ID
const getBookingById = async (req, res) => {
  let id = req.body.id
  await Booking.findOne({
    where: { bookingId: id },
    include: [
      {
        model: VAS,
      },
    ],
  })
    .then((booking) => res.status(200).send(booking))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
//Get booking by user ID
const getBookingByUserId = async (req, res) => {
  let id = req.body.id
  let page = req.body.page
  let offset = page * 5
  await Booking.findAndCountAll({
    offset: offset,
    limit: 5,
    where: { customerId: id },
    include: [
      {
        model: Hotel,
      },
    ],
    order: [['bookingId', 'DESC']],
  })
    .then((booking) => res.status(200).send(booking))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//Get booking current by user ID
const getCurrentBookingByUserId = async (req, res) => {
  let id = req.body.id
  let page = req.body.page
  let offset = page * 5
  let today = new Date()
  await Booking.findAndCountAll({
    offset: offset,
    limit: 5,
    where: {
      customerId: id,
      checkInDate: {
        [Op.gte]: today,
      },
    },
    include: [
      {
        model: Hotel,
      },
    ],
    order: [['bookingId', 'DESC']],
  })
    .then((booking) => res.status(200).send(booking))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
//Get booking past by user ID
const getPastBookingByUserId = async (req, res) => {
  let id = req.body.id
  let page = req.body.page
  let offset = page * 5
  let today = new Date()
  await Booking.findAndCountAll({
    offset: offset,
    limit: 5,
    where: {
      customerId: id,
      checkInDate: {
        [Op.lte]: today,
      },
    },
    include: [
      {
        model: Hotel,
      },
    ],
    order: [['bookingId', 'DESC']],
  })
    .then((booking) => res.status(200).send(booking))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
//  update booking by ID
const updateBookingById = async (req, res) => {
  let id = req.params.id
  await Booking.update(req.body, { where: { bookingId: id } })
    .then((booking) => res.status(200).send(booking))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//  Delete booking by ID
const deleteBookingByID = async (req, res) => {
  let id = req.params.id
  await Booking.destroy({ where: { bookingId: id } })
    .then((booking) => {
      if (booking != 0) {
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

//add vas to bookings

const addVASToBooking = async (req, res) => {
  let info = {
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    specialRequest: req.body.specialRequest,
    arrivalTime: req.body.arrivalTime,
    guestName: req.body.guestName,
    rentCar: req.body.rentCar,
    customerId: req.body.customerId,
  }
  let vasId = req.body.vasId
  let vasinfo = await VAS.findOne({ where: { vasId: vasId } })
  let bookingId = req.body.bookingId
  let bookinginfo = await Booking.findOne({ where: { bookingId: bookingId } })
  await bookinginfo
    .addVas(vasinfo)
    .then((data) => {
      res.status(200).send('success')
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//  get all booking by hotel admin id
const getAllBookigsByHotelAdminId = async (req, res) => {
  let id = req.body.id
  let page = req.body.page
  let offset = page * 5
  await Booking.findAndCountAll({
    offset: offset,
    limit: 5,
    include: [
      {
        model: Hotel,
        where: {
          userUId: id,
        },
      },
    ],
    order: [['bookingId', 'DESC']],
  })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(403).send(err)
    })
}
//  get all current booking by hotel admin id
const getCurrentBookigsByHotelAdminId = async (req, res) => {
  let id = req.body.id
  let page = req.body.page
  let offset = page * 5
  let today = new Date()
  await Booking.findAndCountAll({
    offset: offset,
    limit: 5,
    where: {
      checkInDate: {
        [Op.gte]: today,
      },
    },

    include: [
      {
        model: Hotel,
        where: {
          userUId: id,
        },
      },
    ],
    order: [['bookingId', 'DESC']],
  })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(403).send(err)
    })
}
//  get all past booking by hotel admin id
const getPastBookigsByHotelAdminId = async (req, res) => {
  let id = req.body.id
  let page = req.body.page
  let offset = page * 5
  let today = new Date()
  await Booking.findAndCountAll({
    offset: offset,
    limit: 5,
    where: {
      checkInDate: {
        [Op.lte]: today,
      },
    },

    include: [
      {
        model: Hotel,
        where: {
          userUId: id,
        },
      },
    ],
    order: [['bookingId', 'DESC']],
  })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(403).send(err)
    })
}
//get monthly booking count by user id and year
const monthlyBookingCountByYearAndUser = async (req, res) => {
  let id = req.body.id
  let year = req.body.year
  let nYear = new Date(year)
  let nextYear = new Date(year)
  nextYear.setFullYear(nYear.getFullYear() + 1)
  await Booking.findAll({
    where: {
      checkInDate: {
        [Op.and]: {
          [Op.gte]: nYear,
          [Op.lte]: nextYear,
        },
      },
    },
  })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(403).send(err)
    })
}
const getBookingCountByHotelAdminUserId = async (req, res) => {
  let id = req.body.id
  await Booking.findAll({
    attributes: [
      [sequelize.fn('count', sequelize.col('hotelHotelId')), 'count'],
    ],
    group: ['hotelHotelId'],
    include: [
      {
        attributes: [
          ['hotelId', 'hotelId'],
          ['name', 'hotelName'],
        ],
        model: Hotel,
        where: {
          userUId: id,
        },
      },
    ],
  })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(403).send(err)
    })
}
module.exports = {
  booking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingByID,
  addVASToBooking,
  getBookingByUserId,
  getCurrentBookingByUserId,
  getPastBookingByUserId,
  getAllBookigsByHotelAdminId,
  getCurrentBookigsByHotelAdminId,
  getPastBookigsByHotelAdminId,
  monthlyBookingCountByYearAndUser,
  getBookingCountByHotelAdminUserId,
}
