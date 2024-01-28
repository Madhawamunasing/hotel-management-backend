const roomtypeController = require('../controllers/roomtypeController.js')

const router = require('express').Router()

router.post('/createRoomtype', roomtypeController.createRoomtype)
router.get('/getAllRoomType', roomtypeController.getAllRoomType)
router.post('/getRoomTypeById', roomtypeController.getRoomTypeById)
router.post('/getRoomTypesByHotelId', roomtypeController.getRoomTypesByHotelId)
router.put('/updateRoomTypeById/:id', roomtypeController.updateRoomTypeById)
router.delete('/deleteRoomTypeById/:id', roomtypeController.deleteRoomTypeById)

module.exports = router
