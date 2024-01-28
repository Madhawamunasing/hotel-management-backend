const discountController = require('../controllers/discountController.js')
const router = require('express').Router()

router.post('/createDiscount', discountController.createDiscount)
router.get('/getAllDiscount', discountController.getAllDiscount)
router.post('/getDiscountByHotelId', discountController.getDiscountByHotelId)
router.delete(
  '/deleteDiscountyById/:id',
  discountController.deleteDiscountyById
)
module.exports = router
