const db= require('../models')

const Souvenir= db.souveniries

// Add souveniries
const addSouvenir= async(req,res)=>{

    let info={
        title:req.body.title,
        subTitle:req.body.subTitle,
        description:req.body.description,
        image:req.body.image,
        hotelId:req.body.hotelId,
        

    }
    await Souvenir.create(info)
    .then(souvenir=>res.status(200).send(souvenir))
    .catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })

}

// Get all Souveniries
const getAllSouvenir = async (req, res) => {

    let souveniries = await Souvenir.findAll({})
    res.status(200).send(souveniries)

}

//Get souvenir by ID
const getSouvenirByHotelId = async (req, res) => {

    let id = req.body.id
    let souveniries = await Souvenir.findAll({ where: { hotelId: id }})
    res.status(200).send(souveniries)

}

//Get souvenir by ID
const getSouvenirById = async (req, res) => {

    let id = req.body.id
    let souvenir = await Souvenir.findOne({ where: { souvenirId: id }})
    res.status(200).send(souvenir)

}

//  update souvenir by ID
const updateRoomTypeById = async (req, res) => {

    let id = req.params.id
    await Souvenir.update(req.body, { where: { souvenirId: id }})
    .then((data)=>{
        console.log(data)
        res.status(200).send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
   
}


//  Delete souvenir by ID
const deleteSouvenirById = async (req, res) => {

    let id = req.params.id
    await Souvenir.destroy({ where: { souvenirId: id }} )
    .then((data)=>{
        console.log(data)
        if(data!=0){
            res.status(200).send('Success')
        }else{
            res.status(200).send('Error')
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })  

}
module.exports={
    addSouvenir,
    getAllSouvenir,
    getSouvenirById,
    updateRoomTypeById,
    deleteSouvenirById,
    getSouvenirByHotelId

}