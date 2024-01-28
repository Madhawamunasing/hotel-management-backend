const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const upload = require('./src/v1/middleware/multer.js')
const app = express()
let port = process.env.PORT || 8000

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
const authenticateToken =
  require('./src/v1/auth/authentication.js').authenticateToken

//routers
const userRouter = require('./src/v1/api/routes/userRouter.js')
const messageRouter = require('./src/v1/api/routes/messageRouter.js')
const hotelRouter = require('./src/v1/api/routes/hotelRouter.js')
const requestRouter = require('./src/v1/api/routes/requestRouter.js')
const refferalRouter = require('./src/v1/api/routes/refferalRouter.js')
const couponRouter = require('./src/v1/api/routes/couponRouter.js')
const roomRouter = require('./src/v1/api/routes/roomRouter.js')
const roomtypeRouter = require('./src/v1/api/routes/roomtypeRouter.js')
const bookingRouter = require('./src/v1/api/routes/bookingRouter.js')
const souvenirRouter = require('./src/v1/api/routes/souvenirRouter.js')
const reviewRouter = require('./src/v1/api/routes/reviewRouter.js')
const vasRouter = require('./src/v1/api/routes/vasRouter.js')
const paymentRouter = require('./src/v1/api/routes/paymentRouter.js')
const facilityRouter = require('./src/v1/api/routes/facilityRouter')
const facilitytypeRouter = require('./src/v1/api/routes/facilitytypeRouter.js')
const discountRouter = require('./src/v1/api/routes/discountRouter.js')
const customergradeRouter = require('./src/v1/api/routes/customergradeRouter.js')
const hotelrulesRouter = require('./src/v1/api/routes/hotelrulesRouter.js')
const uploadRouter = require('./src/v1/api/routes/uplodsRoutes.js')

//auth endpoints
app.use('/auth/v1/user/', userRouter)

//api
app.use('/api/v1/user', userRouter)
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/hotel', hotelRouter)
app.use('/api/v1/request', requestRouter)
app.use('/api/v1/refferal', refferalRouter)
app.use('/api/v1/coupon', couponRouter)
app.use('/api/v1/room', roomRouter)
app.use('/api/v1/roomtype', roomtypeRouter)
app.use('/api/v1/booking', bookingRouter)
app.use('/api/v1/souvenir', souvenirRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/vas', vasRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/facility', facilityRouter)
app.use('/api/v1/facilitytype', facilitytypeRouter)
app.use('/api/v1/discount', discountRouter)
app.use('/api/v1/loyalty', customergradeRouter)
app.use('/api/v1/rules', hotelrulesRouter)
app.use('/api/v1/uploads', upload.single('image'), uploadRouter)

// Multiple Files Route Handler
// app.post('/multiple', upload.array('images', 3), (req, res) => {
//   console.log(req.files)
//   res.send('Multiple Files Upload Success')
// })

//test api
app.get('/', (req, res) => {
  res.json({ message: 'hello' })
})

//server
app.listen(port, () => {
  console.log(`server is running port ${port} `)
})
