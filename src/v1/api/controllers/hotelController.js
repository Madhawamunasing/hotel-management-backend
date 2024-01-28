const db = require('../models')
var Sequelize = require('sequelize')
var sequelize = require('sequelize')
const { where } = require('sequelize')
const Hotel = db.hotels
const Op = Sequelize.Op
const Booking = db.bookings
const Room = db.rooms
const Roomtypes = db.roomtypes

//register new hotel
const registerHotel = async (req, res) => {
  let info = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    description: req.body.description,
    email: req.body.emaildistrict,
    province: req.body.province,
    district: req.body.district,
    town: req.body.town,
    Street1: req.body.Street1,
    Street2: req.body.Street2,
    userUId: req.body.userId,
  }

  await Hotel.create(info)
    .then((hotel) => res.status(200).send(hotel))
    .catch((err) => res.status(500).send(err))
}

//get all hotels
const getAllHotels = async (req, res) => {
  let hotels = await Hotel.findAll({})
  res.status(200).send(hotels)
}

//get a hotel by id
const getHotelById = async (req, res) => {
  let id = req.body.id
  let hotel = await Hotel.findAll({ where: { hotelId: id } })
  res.status(200).send(hotel)
}
//get a hotel by user id
const getHotelByUserId = async (req, res) => {
  let id = req.body.id
  let hotel = await Hotel.findAll({ where: { userUId: id } })
  res.status(200).send(hotel)
}

//update a hotel by id
const updateHotelById = async (req, res) => {
  let id = req.params.id
  const hotel = await Hotel.update(req.body, { where: { hotelId: id } })
  res.status(200).send(hotel)
}
//delete a hotel by id
const deleteHotelById = async (req, res) => {
  let id = req.params.id
  await Hotel.destroy({ where: { hotelId: id } })
    .then((status) => {
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
//get hotels by province
const getAllHotelsByProvince = async (req, res) => {
  let province = req.body.province
  let hotel = await Hotel.findAll({ where: { province: province } })
  res.status(200).send(hotel)
}
//get hotels by district
const getAllHotelsByDistrict = async (req, res) => {
  let district = req.body.district
  let hotel = await Hotel.findAll({ where: { district: district } })
  res.status(200).send(hotel)
}

//get hotels page by page and status
const getHotelsByStatus = async (req, res) => {
  let page = req.body.page
  let status = req.body.status

  let offset = page * 10

  await Hotel.findAll({
    where: { status: status },
    offset: offset,
    limit: 10,
  })
    .then((hotel) => {
      res.status(200).send(hotel)
    })
    .catch((err) => {
      res.status(400).send(hotel)
    })
}
//  search hotel
const search = async (req, res) => {
  let location = req.body.location
  let adult = req.body.adult
  let children = req.body.children
  let reqRooms = req.body.rooms
  let startDate = new Date(req.body.checkInDate)
  let endDate = new Date(req.body.checkOutDate)
  let keyword = '%' + location + '%'
  let page = req.body.page
  let offset = page * 10
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
          checkInDate: {
            [Op.and]: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
        },
        {
          checkOutDate: {
            [Op.and]: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
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
      //info gives all the booked rooms and room count
      // get all the rooms
      Room.findAndCountAll({
        // attributes:['roomId','qty'],
        group: ['hotelHotelId'],
        where: {
          persons: {
            [Op.gte]: personPerRoom,
          },
        },
        offset: offset,
        limit: 10,
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

//  search hotel by rate
const searchSotByRate = async (req, res) => {
  let location = req.body.location
  let adult = req.body.adult
  let children = req.body.children
  let reqRooms = req.body.rooms
  let lowerPrice = req.body.lowerPrice
  let upperPrice = req.body.upperPrice
  let startDate = new Date(req.body.checkInDate)
  let endDate = new Date(req.body.checkOutDate)
  let keyword = '%' + location + '%'
  let page = req.body.page
  let offset = page * 10
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
          checkInDate: {
            [Op.and]: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
        },
        {
          checkOutDate: {
            [Op.and]: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
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
      //info gives all the booked rooms and room count
      // get all the rooms
      Room.findAndCountAll({
        // attributes:['roomId','qty'],
        group: ['hotelHotelId'],
        where: {
          [Op.and]: [
            {
              persons: {
                [Op.gte]: personPerRoom,
              },
            },
            {
              rate: {
                [Op.and]: {
                  [Op.gte]: lowerPrice,
                  [Op.lte]: upperPrice,
                },
              },
            },
          ],
        },
        offset: offset,
        limit: 10,
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

const sortHotelsByBookingCount = async (req, res) => {
  const userId = req.body.id
  await Booking.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('bookingId')), 'total']],
    group: ['hotelHotelId'],
    order: [[sequelize.literal('total'), 'DESC']],
    include: [
      {
        model: Hotel,
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
  registerHotel,
  getAllHotels,
  getHotelById,
  updateHotelById,
  deleteHotelById,
  getAllHotelsByProvince,
  getAllHotelsByDistrict,
  search,
  getHotelsByStatus,
  getHotelByUserId,
  sortHotelsByBookingCount,
  searchSotByRate,
}
