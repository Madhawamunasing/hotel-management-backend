var Sequelize = require('sequelize')
const db = require('../models')
const Op = Sequelize.Op
const Message = db.messages

//send messages
const sendMessage = async (req, res) => {
  let info = {
    notification: req.body.notification,
    type: req.body.type,
    from: req.body.from,
    to: req.body.to,
    mardRead: req.body.mardRead,
  }
  try {
    const message = await Message.create(info)
    res.status(200).send(message)
  } catch (e) {
    res.send('Error')
    console.log('Error')
  }
}

// Get all messages
const getAllMessage = async (req, res) => {
  let messages = await Message.findAll({})
  res.status(200).send(messages)
}

//Get message by sender ID
const getMessagesBySenderId = async (req, res) => {
  let id = req.body.id
  let messages = await Message.findAll({ where: { from: id } })
  res.status(200).send(messages)
}

//Get message by reciever ID
const getMessagesByRecieverId = async (req, res) => {
  let id = req.body.id
  let messages = await Message.findAll({ where: { to: id } })
  res.status(200).send(messages)
}
//Get unread message count by reciever ID
const getUnreadCountByRecieverId = async (req, res) => {
  let id = req.body.id
  let messages = await Message.findAll({ where: { mardRead: 0, to: id } })
  res.status(200).send(messages)
}

//Get message by reciever ID and date
const getMessagesBySenderIdAndDate = async (req, res) => {
  let id = req.body.id
  let sDate = req.body.startDate
  let eDate = req.body.endDate
  let slDate = new Date(sDate)
  let elDate = new Date(eDate)
  await Message.findAll({
    where: { from: id, createdAt: { [Op.between]: [slDate, elDate] } },
  })
    .then((message) => res.status(200).send(message))
    .catch((err) => console.log(err))
}

//Get message by reciever ID and date
const getMessagesByRecieverIdAndDate = async (req, res) => {
  let id = req.body.id
  let sDate = req.body.startDate
  let eDate = req.body.endDate
  let slDate = new Date(sDate)
  let elDate = new Date(eDate)
  await Message.findAll({
    where: { to: id, createdAt: { [Op.between]: [slDate, elDate] } },
  })
    .then((message) => res.status(200).send(message))
    .catch((err) => console.log(err))
}

const markAsRead = async (req, res) => {
  let id = req.body.id
  console.log(id)
  await Message.update({ mardRead: true }, { where: { messageId: id } })
    .then((message) => res.status(200).send(message))
    .catch((err) => console.log(err))
}

module.exports = {
  sendMessage,
  getAllMessage,
  getMessagesBySenderId,
  getMessagesByRecieverId,
  getMessagesBySenderIdAndDate,
  getMessagesByRecieverIdAndDate,
  markAsRead,
  getUnreadCountByRecieverId,
}
