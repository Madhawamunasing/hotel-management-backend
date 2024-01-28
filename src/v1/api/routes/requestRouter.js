const requestController= require('../controllers/requestController.js')

const router =require('express').Router()


router.post('/createRequest',requestController.createRequest)
router.get('/getAllRequest',requestController.getAllRequest)
router.put('/acceptRequest',requestController.acceptRequest)
router.post('/getRequestByRequestId',requestController.getRequestByRequestId) 
router.post('/getRequestByhotelAdminId',requestController.getRequestByhotelAdminId)

module.exports=router