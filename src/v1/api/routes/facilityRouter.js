const facilityController = require('../controllers/facilityController.js')
const router = require('express').Router()

router.post('/createFacility', facilityController.createFacility)
router.post('/getAllFacilities', facilityController.getAllFacilities)
router.post(
  '/getAllFacilitiesByHotelId',
  facilityController.getAllFacilitiesByHotelId
)
router.post(
  '/getFacilitiesByHotelId',
  facilityController.getFacilitiesByHotelId
)
router.post(
  '/getFacilitiesByFacilityTypeId',
  facilityController.getFacilitiesByFacilityTypeId
)

router.delete('/deleteFacilityById/:id', facilityController.deleteFacilityById)

module.exports = router
