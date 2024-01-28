const customergradeController = require('../controllers/customergradeController.js')

const router = require('express').Router()

router.post('/getCustomerDiscount', customergradeController.getCustomerDiscount)
router.post('/getCustomerGrade', customergradeController.getCustomerGrade)

module.exports = router
