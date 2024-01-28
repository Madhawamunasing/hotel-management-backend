const couponController = require('../controllers/couponController.js')

const router = require('express').Router()

router.post('/createCoupon', couponController.createCoupon)
router.get('/getAllCoupons', couponController.getAllCoupons)
router.post('/getCouponByCouponId', couponController.getCouponByCouponId)
router.delete('/deleteCouponById/:id', couponController.deleteCouponById)
router.post('/validateCoupon', couponController.validateCoupon)
router.post('/getAllCouponByHotelId', couponController.getAllCouponByHotelId)

module.exports = router
