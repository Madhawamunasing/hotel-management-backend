const userController = require('../controllers/userController.js')
const userApi = require('../../auth/api.js')
const refreshAccessToken =
  require('../../auth/authentication.js').refreshAccessToken

const router = require('express').Router()

router.post('/addUser', userApi.addUser)
router.post('/login', userApi.login)
router.post('/refresh', refreshAccessToken)
router.post('/logout', userApi.logout)

router.get('/getAllUsers', userController.getAllUser)
router.post('/getUserById', userController.getUserById)
router.put('/updateUserById/:id', userController.updateUserById)
router.delete('/deleteUserById/:id', userController.deleteUserById)
router.post('/changePassword', userController.changePassword)

module.exports = router
