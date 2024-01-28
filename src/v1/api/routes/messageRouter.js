const userController = require('../controllers/messageController.js')

const router = require('express').Router()

router.get('/getAllMessage', userController.getAllMessage)
router.post('/sendMessage', userController.sendMessage)
router.post('/getMessagesBySenderId', userController.getMessagesBySenderId)
router.post('/getMessagesByRecieverId', userController.getMessagesByRecieverId)
router.post(
  '/getUnreadCountByRecieverId',
  userController.getUnreadCountByRecieverId
)
router.post(
  '/getMessagesBySenderIdAndDate',
  userController.getMessagesBySenderIdAndDate
)
router.post(
  '/getMessagesByRecieverIdAndDate',
  userController.getMessagesByRecieverIdAndDate
)
router.post('/markAsRead', userController.markAsRead)

module.exports = router
