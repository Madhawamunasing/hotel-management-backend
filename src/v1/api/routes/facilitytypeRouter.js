const facilitytypeController = require('../controllers/facilitytypeController.js')
const router = require('express').Router()

router.post('/createFacilityType', facilitytypeController.createFacilityType)
router.get('/getAllFacilityTypes', facilitytypeController.getAllFacilityTypes)
router.post(
  '/getFacilityTypesByHotelId',
  facilitytypeController.getFacilityTypesByHotelId
)
router.post(
  '/getFacilityTypesById',
  facilitytypeController.getFacilityTypesById
)
router.delete(
  '/deleteFacilityTypeById/:id',
  facilitytypeController.deleteFacilityTypeById
)

module.exports = router
