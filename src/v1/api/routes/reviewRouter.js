const reviewController= require('../controllers/reviewController.js')

const router =require('express').Router()


router.post('/createReview',reviewController.createReview)
router.get('/getAllReviews',reviewController.getAllReviews)
router.post('/getReviewById',reviewController.getReviewById)
router.put('/updateReviewById/:id',reviewController.updateReviewById)
router.delete('/deleteReviewById/:id',reviewController.deleteReviewById)

router.post('/getReviewByHotelId',reviewController.getReviewByHotelId)
router.post('/getReviewByCustomerId',reviewController.getReviewByCustomerId)
router.post('/getReviewByCustomerIdAndHotelId',reviewController.getReviewByCustomerIdAndHotelId)


module.exports=router