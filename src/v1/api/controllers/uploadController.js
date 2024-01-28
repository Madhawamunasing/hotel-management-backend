const db = require('../models')
const User = db.users
const Hotel = db.hotels
const RoomImage = db.roomimages
const Souvenir = db.souveniries
const cloudinary = require('../../middleware/cloudinary.js')

//update profile picture
const updateProfilePicture = async (req, res) => {
  let id = req.body.id
  let path = req.file.path
  await cloudinary.uploader
    .upload(path)
    .then((result) => {
      User.update(
        { image: result.secure_url, cloudinary_id: result.public_id },
        { where: { uId: id } }
      )
        .then((response) => {
          if (response != 0) {
            res.status(200).send('Success')
          } else {
            res.status(200).send('Failed')
          }
        })
        .catch((err) => {
          res.status(500).send('Error')
        })
    })
    .catch((err) => {
      res.status(500).send('Error')
    })
}

//update hotel plan image
const addHotelPlan = async (req, res) => {
  let id = req.body.id
  let path = req.file.path
  await cloudinary.uploader
    .upload(path)
    .then((result) => {
      Hotel.update(
        { plan_image: result.secure_url, plan_cloudinary_id: result.public_id },
        { where: { hotelId: id } }
      )
        .then((response) => {
          if (response != 0) {
            res.status(200).send('Success')
          } else {
            res.status(200).send('Failed')
          }
        })
        .catch((err) => {
          res.status(500).send('Error')
        })
    })
    .catch((err) => {
      res.status(500).send('Error')
    })
}
//delete hotel plan  image
const deleteHotelPlanImage = async (req, res) => {
  let id = req.body.id
  let path = null
  await Hotel.findOne({ where: { hotelId: id } })
    .then((hotel) => {
      cloudinary.uploader
        .destroy(hotel.dataValues.plan_cloudinary_id)
        .then((response) => {
          if (response.result == 'ok') {
            Hotel.update(
              { plan_image: null, plan_cloudinary_id: null },
              { where: { hotelId: id } }
            )
              .then(() => {
                console.log('deleted')
                res.status(200).send('Success')
              })
              .catch((err) => {
                console.log('deleted')
                res.status(200).send(err)
              })
          } else {
            res.status(200).send('Failed')
          }
        })
        .catch((err) => {
          res.status(500).send('nothing to delete')
        })
    })
    .catch((err) => {
      res.status(500).send('err')
    })
}

//delete profile picture
const deleteProfilePicture = async (req, res) => {
  let id = req.body.id
  let path = null
  await User.findOne({ where: { uId: id } })
    .then((user) => {
      cloudinary.uploader
        .destroy(user.dataValues.cloudinary_id)
        .then((response) => {
          if (response.result == 'ok') {
            User.update(
              { image: null, cloudinary_id: null },
              { where: { uId: id } }
            )
              .then(() => {
                console.log('deleted')
                res.status(200).send('Success')
              })
              .catch((err) => {
                console.log('deleted')
                res.status(200).send(err)
              })
          } else {
            res.status(200).send('Failed')
          }
        })
        .catch((err) => {
          res.status(500).send('nothing to delete')
        })
    })
    .catch((err) => {
      res.status(500).send('err')
    })
}

//add room images
const addRoomImage = async (req, res) => {
  let path = req.file.path
  const result = await cloudinary.uploader.upload(path)
  let info = {
    roomRoomId: req.body.roomId,
    image: result.secure_url,
    cloudinary_id: result.public_id,
  }
  await RoomImage.create(info)
    .then((image) => res.status(200).send(image))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
// Get all room images
const getAllImages = async (req, res) => {
  await RoomImage.findAll({})
    .then((roomImages) => {
      res.status(200).send(roomImages)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

// Get all room images by room id
const getAllImagesByRoomId = async (req, res) => {
  let id = req.body.id
  await RoomImage.findAll({ where: { roomRoomId: id } })
    .then((roomImages) => {
      res.status(200).send(roomImages)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

//delete room image by image id
const deleteRoomImageById = async (req, res) => {
  let id = req.params.id
  console.log(id)
  await RoomImage.findOne({ where: { imageId: id } })
    .then((roomImage) => {
      RoomImage.destroy({ where: { imageId: id } })
        .then((data) => {
          console.log(roomImage)
          if (data != 0) {
            cloudinary.uploader.destroy(roomImage.dataValues.cloudinary_id)
            res.status(200).send('Success')
          } else {
            res.status(200).send('Nothing to delete')
          }
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send('error')
        })
    })
    .catch((err) => {
      res.status(500).send('error')
    })
}
//add hotel image
const updateHotelImage = async (req, res) => {
  let id = req.body.id
  let path = req.file.path
  await cloudinary.uploader
    .upload(path)
    .then((result) => {
      Hotel.update(
        { image: result.secure_url, cloudinary_id: result.public_id },
        { where: { hotelId: id } }
      )
        .then((response) => {
          if (response != 0) {
            res.status(200).send('Success')
          } else {
            res.status(200).send('Failed')
          }
        })
        .catch((err) => {
          res.status(500).send('Error')
        })
    })
    .catch((err) => {
      res.status(500).send('Error')
    })
}

//delete profile picture
const deleteHotelImage = async (req, res) => {
  let id = req.body.id
  let path = null
  await Hotel.findOne({ where: { hotelId: id } })
    .then((hotel) => {
      cloudinary.uploader
        .destroy(hotel.dataValues.cloudinary_id)
        .then((response) => {
          if (response.result == 'ok') {
            Hotel.update(
              { image: null, cloudinary_id: null },
              { where: { hotelId: id } }
            )
              .then(() => {
                console.log('deleted')
                res.status(200).send('Success')
              })
              .catch((err) => {
                console.log('deleted')
                res.status(200).send(err)
              })
          } else {
            res.status(200).send('Failed')
          }
        })
        .catch((err) => {
          res.status(500).send('nothing to delete')
        })
    })
    .catch((err) => {
      res.status(500).send('err')
    })
}

//add Souvenir images
const addSouvenir = async (req, res) => {
  let path = req.file.path
  const result = await cloudinary.uploader.upload(path)
  let info = {
    title: req.body.title,
    subTitle: req.body.subTitle,
    description: req.body.description,
    hotelId: req.body.hotelId,
    image: result.secure_url,
    cloudinary_id: result.public_id,
  }
  await Souvenir.create(info)
    .then((image) => res.status(200).send(image))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
//delete room image by image id
const deleteSouvenirById = async (req, res) => {
  let id = req.params.id
  console.log(id)
  await Souvenir.findOne({ where: { souvenirId: id } })
    .then((souvenir) => {
      RoomImage.destroy({ where: { souvenirId: id } })
        .then((data) => {
          console.log(souvenir)
          if (data != 0) {
            cloudinary.uploader.destroy(souvenir.dataValues.cloudinary_id)
            res.status(200).send('Success')
          } else {
            res.status(200).send('Nothing to delete')
          }
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send('error')
        })
    })
    .catch((err) => {
      res.status(500).send('error')
    })
}
module.exports = {
  updateProfilePicture,
  deleteProfilePicture,
  addRoomImage,
  deleteRoomImageById,
  getAllImages,
  getAllImagesByRoomId,
  updateHotelImage,
  deleteHotelImage,
  addSouvenir,
  deleteSouvenirById,
  addHotelPlan,
  deleteHotelPlanImage,
}
