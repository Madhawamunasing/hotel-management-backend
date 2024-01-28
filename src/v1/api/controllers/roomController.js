const db = require('../models')
var Sequelize = require('sequelize')
var sequelize = require('sequelize')
const { where } = require('sequelize')
const Hotel = db.hotels
const Op = Sequelize.Op
const Booking = db.bookings
const Room = db.rooms
const Roomtypes = db.roomtypes

const createRoom = async (req, res) => {
  let info = {
    description: req.body.description,
    rate: req.body.rate,
    qty: req.body.qty,
    images: req.body.images,
    area: req.body.area,
    persons: req.body.persons,
    hotelHotelId: req.body.hotelId,
    roomtypeRoomTypeId: req.body.roomTypeId,
  }

  const room = await Room.create(info)
    .then((room) => res.status(200).send(room))
    .catch((err) => {
      res.status(500).send(err)
      console.log(err)
    })
}

// Get all rooms
const getAllRooms = async (req, res) => {
  await Room.findAll({})
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//Get room by room ID
const getRoomById = async (req, res) => {
  let id = req.body.id
  console.log(id)
  await Room.findOne({
    where: { roomId: id },
    include: [
      {
        model: Roomtypes,
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
//Get room by hotel ID
const getRoomByHotelId = async (req, res) => {
  let id = req.body.id
  console.log(id)
  await Room.findAll({ where: { hotelHotelId: id } })
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
//Get room by hotel ID and room type
const getRoomsByHotelIdAndRoomType = async (req, res) => {
  let hotelId = req.body.hotelId
  let roomTypeId = req.body.roomTypeId
  await Room.findAll({
    where: { hotelHotelId: hotelId, roomtypeRoomTypeId: roomTypeId },
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
//  update room by ID
const updateRoomById = async (req, res) => {
  let id = req.params.id
  await Room.update(req.body, { where: { roomId: id } })
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
//  Delete room by ID
const deleteRoomById = async (req, res) => {
  let id = req.params.id
  await Room.destroy({ where: { roomId: id } })
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
const getAvailbleRooms = async (req, res) => {
  let page = req.body.page
  let offset = page * 10
  let location = req.body.location
  let adult = req.body.adult
  let children = req.body.children
  let reqRooms = req.body.rooms
  let startDate = new Date(req.body.checkInDate)
  let endDate = new Date(req.body.checkOutDate)
  let keyword = '%' + location + '%'
  let hotelId = req.body.hotelId
  let roomTypeId = req.body.roomTypeId

  //calculate persons per room
  let totalPerson = parseInt(adult) + parseFloat(children / 2)
  let personPerRoom = Math.round(totalPerson / reqRooms)

  await Booking.findAll({
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
    },

    include: [
      {
        attributes: [],
        model: Hotel,
        as: 'hotel',
        where: {
          [Op.or]: [
            { name: { [Op.like]: keyword } },
            { district: { [Op.like]: keyword } },
            { district: { [Op.like]: keyword } },
            { province: { [Op.like]: keyword } },
            { town: { [Op.like]: keyword } },
            { Street1: { [Op.like]: keyword } },
            { Street2: { [Op.like]: keyword } },
          ],
          // hotelId: hotelId,
          // roomtypeRoomTypeId: roomTypeId,
        },
      },
      {
        attributes: [],
        model: Room,
        as: 'room',
      },
    ],
  })
    .then((info) => {
      console.log(info)

      //info gives all the booked rooms and room count
      // get all the rooms
      Room.findAndCountAll({
        // attributes:['roomId','qty'],
        offset: offset,
        limit: 10,
        where: {
          persons: {
            [Op.gte]: personPerRoom,
          },
          hotelHotelId: hotelId,
          roomtypeRoomTypeId: roomTypeId,
        },
        include: [
          {
            // attributes:[],
            model: Hotel,
            as: 'hotel',
            where: {
              [Op.or]: [
                { name: { [Op.like]: keyword } },
                { district: { [Op.like]: keyword } },
                { district: { [Op.like]: keyword } },
                { province: { [Op.like]: keyword } },
                { town: { [Op.like]: keyword } },
                { Street1: { [Op.like]: keyword } },
                { Street2: { [Op.like]: keyword } },
              ],
            },
          },
          {
            // attributes:[],
            model: Roomtypes,
            as: 'roomtype',
          },
        ],
      }).then((rooms) => {
        var len = Object.keys(rooms).length
        console.log(info)
        for (var room in rooms) {
          for (var bookedRoom in info) {
            // console.log(room);
            // console.log(bookedRoom);
            // console.log(rooms[room].qty);
            // console.log((parseInt(info[bookedRoom].dataValues.total))+parseInt(reqRooms));
            // console.log("----");
            if (
              room == bookedRoom &&
              parseInt(rooms[room].qty) <=
                parseInt(info[bookedRoom].dataValues.total) + parseInt(reqRooms)
            ) {
              // console.log("------------");
              // console.log(room);
              // console.log(bookedRoom);
              // console.log(rooms[room].qty);
              // console.log(info[bookedRoom].dataValues.total);

              // console.log("------------");
              delete rooms[room]
              console.log('removed from the list')
            } else {
              // console.log(rooms[room].qty);
              try {
                rooms[room].qty =
                  rooms[room].qty - info[bookedRoom].dataValues.total
              } catch (err) {
                console.log(err)
              }
            }
          }
          //  console.log(info);
        }
        res.send(rooms)
      })

      // res.status(200).send(info)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

const getAvailableRoomQtyByRoomId = async (req, res) => {
  let roomId = req.body.roomId
  let startDate = new Date(req.body.checkInDate)
  let endDate = new Date(req.body.checkOutDate)
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
      roomRoomId: roomId,
    },
  })
    .then((data) => {
      Room.findOne({
        attributes: ['qty'],
        where: { roomId: req.body.roomId },
      })
        .then((roomQty) => {
          let qty = 0
          if (data != null) {
            qty = roomQty.qty - data.dataValues.total
          } else {
            qty = roomQty.qty
          }

          let response = {
            'to be checkIn': startDate,
            'to be checkout': endDate,
            available: qty,
          }
          res.status(200).send(response)
        })
        .catch((err) => {
          res.status(200).send(err)
        })
    })
    .catch((err) => {
      res.status(200).send(err)
    })
}
module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
  getRoomByHotelId,
  getRoomsByHotelIdAndRoomType,
  getAvailbleRooms,
  getAvailableRoomQtyByRoomId,
}
