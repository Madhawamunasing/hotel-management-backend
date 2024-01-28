const roomController = require('../controllers/roomController.js')

const router = require('express').Router()

router.post('/createRoom', roomController.createRoom)
router.get('/getAllRooms', roomController.getAllRooms)
router.post('/getRoomById', roomController.getRoomById)
router.post('/getRoomByHotelId', roomController.getRoomByHotelId)
router.post(
  '/getRoomsByHotelIdAndRoomType',
  roomController.getRoomsByHotelIdAndRoomType
)
router.put('/updateRoomById/:id', roomController.updateRoomById)
router.delete('/deleteRoomById/:id', roomController.deleteRoomById)
router.post('/getAvailbleRooms', roomController.getAvailbleRooms)
router.post(
  '/getAvailableRoomQtyByRoomId',
  roomController.getAvailableRoomQtyByRoomId
)

module.exports = router
