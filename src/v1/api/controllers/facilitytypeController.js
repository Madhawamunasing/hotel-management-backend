const db = require('../models')
const Facilitytype = db.facilitytypes

// Add facilty type
const createFacilityType = async (req, res) => {
  let info = {
    name: req.body.name,
    description: req.body.description,
    hotelHotelId: req.body.hotelId,
  }
  await Facilitytype.create(info)
    .then((facilityType) => res.status(200).send(facilityType))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

// Get all facility types
const getAllFacilityTypes = async (req, res) => {
  await Facilitytype.findAll({})
    .then((facilitytypes) => res.status(200).send(facilitytypes))
    .catch((err) => {
      res.status(500).send(err)
    })
}
//Get facility types by hotel ID
const getFacilityTypesByHotelId = async (req, res) => {
  let id = req.body.hotelId
  await Facilitytype.findAll({ where: { hotelHotelId: id } })
    .then((facilitytypes) => res.status(200).send(facilitytypes))
    .catch((err) => {
      res.status(500).send(err)
    })
}
//Get facilites by  ID
const getFacilityTypesById = async (req, res) => {
  let id = req.body.id
  await Facilitytype.findAll({ where: { facilityTypeId: id } })
    .then((facilitytypes) => res.status(200).send(facilitytypes))
    .catch((err) => {
      res.status(500).send(err)
    })
}

// Delete facility type by id
const deleteFacilityTypeById = async (req, res) => {
  let id = req.params.id
  await Facilitytype.destroy({ where: { facilityTypeId: id } })
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
  createFacilityType,
  getAllFacilityTypes,
  getFacilityTypesByHotelId,
  getFacilityTypesById,
  deleteFacilityTypeById,
}
