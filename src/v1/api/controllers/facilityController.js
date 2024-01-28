const db = require('../models')
const Facility = db.facilities
const Facilitytype = db.facilitytypes

// Add facilty
const createFacility = async (req, res) => {
  let info = {
    facilitytypeFacilityTypeId: req.body.facilityTypeId,
    hotelHotelId: req.body.hotelId,
    name: req.body.name,
  }
  await Facility.create(info)
    .then((facility) => res.status(200).send(facility))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

// Get all facilties
const getAllFacilities = async (req, res) => {
  await Facility.findAll({})
    .then((facilities) => res.status(200).send(facilities))
    .catch((err) => {
      res.status(500).send(err)
    })
}

//Get facilites by hotel ID
const getAllFacilitiesByHotelId = async (req, res) => {
  let id = req.body.id
  await Facility.findAll({
    where: { hotelHotelId: id },
    include: [
      {
        model: Facilitytype,
        required: true,
      },
    ],
  })
    .then((facilities) => res.status(200).send(facilities))
    .catch((err) => {
      res.status(500).send(err)
    })
}

//Get facilities by hotel ID
const getFacilitiesByHotelId = async (req, res) => {
  let id = req.body.hotelId
  await Facility.findAll({ where: { hotelHotelId: id } })
    .then((facilitytypes) => res.status(200).send(facilitytypes))
    .catch((err) => {
      res.status(500).send(err)
    })
}
//Get facilities by hotel ID
const getFacilitiesByFacilityTypeId = async (req, res) => {
  let id = req.body.facilityTypeId
  await Facility.findAll({ where: { facilitytypeFacilityTypeId: id } })
    .then((facilitytypes) => res.status(200).send(facilitytypes))
    .catch((err) => {
      res.status(500).send(err)
    })
}
// Delete facility by id
const deleteFacilityById = async (req, res) => {
  let id = req.params.id
  await Facility.destroy({ where: { facilityId: id } })
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
  createFacility,
  getAllFacilities,
  deleteFacilityById,
  getAllFacilitiesByHotelId,
  getFacilitiesByHotelId,
  getFacilitiesByFacilityTypeId,
}
