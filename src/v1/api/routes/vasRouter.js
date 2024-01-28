const vasController = require('../controllers/vasController.js')

const router = require('express').Router()

router.post('/createVAS', vasController.createVAS)
router.get('/getAllVAS', vasController.getAllVAS)
router.post('/getVASById', vasController.getVASById)
router.put('/updateVASById/:id', vasController.updateVASById)
router.delete('/deleteVASById/:vasId', vasController.deleteVASById)
router.delete(
  '/deleteVASByBookingAndVASId/:bookingId/:vasId',
  vasController.deleteVASByBookingAndVASId
)
router.post('/getVASByHotelId', vasController.getVASByHotelId)
router.post('/getVASByBookingId', vasController.getVASByBookingId)

module.exports = router
