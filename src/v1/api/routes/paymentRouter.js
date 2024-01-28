const paymentController= require('../controllers/paymentController.js')

const router =require('express').Router()

router.post('/pay',paymentController.pay)
router.post('/getAllPayments',paymentController.getAllPayments)
router.post('/getAllPaymentsBycustomerId',paymentController.getAllPaymentsBycustomerId)
router.post('/getAllPaymentsBypaymentId',paymentController.getAllPaymentsBypaymentId)
router.post('/getAllPaymentsBybookingId',paymentController.getAllPaymentsBybookingId)
router.post('/paymentStatusByBookingId',paymentController.paymentStatusByBookingId)
router.post('/totalAmountByBookingId',paymentController.totalAmountByBookingId)



module.exports=router