const refferalController= require('../controllers/refferalController.js')

const router =require('express').Router()

router.post('/createRefferal',refferalController.createRefferal)
router.get('/refferalValidate',refferalController.refferalValidate)

module.exports=router