const uploadController = require('../controllers/uploadController.js')

const router = require('express').Router()

//user routes
router.post('/profile-picture', uploadController.updateProfilePicture)
router.post('/profile-picture/delete', uploadController.deleteProfilePicture)

//room images
router.post('/room', uploadController.addRoomImage)
router.get('/room/getAllImages', uploadController.getAllImages)
router.post('/room/getAllImagesByRoomId', uploadController.getAllImagesByRoomId)
router.delete('/room/delete/:id', uploadController.deleteRoomImageById)

//hotel image
router.post('/hotel', uploadController.updateHotelImage)
router.post('/hotel/delete', uploadController.deleteHotelImage)

router.post('/hotel/souvenir', uploadController.addSouvenir)
router.post('/hotel/souvenir/delete/:id', uploadController.deleteSouvenirById)

router.post('/hotel/plan', uploadController.addHotelPlan)
router.post('/hotel/plan/delete', uploadController.deleteHotelPlanImage)

module.exports = router
