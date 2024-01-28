const souvenirController= require('../controllers/souvenirController.js')

const router =require('express').Router()

router.post('/addSouvenir',souvenirController.addSouvenir)
router.get('/getAllSouvenir',souvenirController.getAllSouvenir)
router.post('/getSouvenirById',souvenirController.getSouvenirById)
router.put('/updateRoomTypeById/:id',souvenirController.updateRoomTypeById)
router.delete('/deleteSouvenirById/:id',souvenirController.deleteSouvenirById)
router.post('/getSouvenirByHotelId',souvenirController.getSouvenirByHotelId)


module.exports=router