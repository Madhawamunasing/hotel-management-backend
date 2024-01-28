const hotelRulesController = require('../controllers/hotelrulesController.js')

const router = require('express').Router()

router.post('/createHotelRule', hotelRulesController.createHotelRule)
router.post('/getAllRulesByHotelId', hotelRulesController.getAllRulesByHotelId)
router.delete('/deleteRuleyById/:id', hotelRulesController.deleteRuleyById)

module.exports = router
