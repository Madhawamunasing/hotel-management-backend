const db = require('../models')
const Hotelrules = db.hotelrules

// Add rule
const createHotelRule = async (req, res) => {
  let info = {
    rule: req.body.rule,
    hotelHotelId: req.body.hotelId,
  }
  await Hotelrules.create(info)
    .then((rule) => res.status(200).send(rule))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}

//Get rule by hotel ID
const getAllRulesByHotelId = async (req, res) => {
  let id = req.body.id
  await Hotelrules.findAll({
    where: { hotelHotelId: id },
  })
    .then((rules) => res.status(200).send(rules))
    .catch((err) => {
      res.status(500).send(err)
    })
}

// Delete rule by id
const deleteRuleyById = async (req, res) => {
  let id = req.params.id
  await Hotelrules.destroy({ where: { hotelRuleId: id } })
    .then((data) => {
      if (data != 0) {
        res.status(200).send('Success')
      } else {
        res.status(200).send('Failed')
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
}
module.exports = { createHotelRule, getAllRulesByHotelId, deleteRuleyById }
