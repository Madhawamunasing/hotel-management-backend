const db= require('../models')
const Paymenttype= db.paymenttypes


//add new payment type
const addPaymentType= async(req,res)=>{

    let info={

        name:req.body.name,
        paymentOption:req.body.paymentOption,
       
    }
    await Paymenttype.create(info)
    .then(paymenttype=>{
        res.status(200).send(paymenttype)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })

}

// Get all payment types
const getAllPaymenttTypes = async (req, res) => {

    let paymenttype = await Paymenttype.findAll({})
    res.status(200).send(paymenttype)

}


//Get paymenttype by ID
const getPaymentTypeById = async (req, res) => {

    let id = req.body.id
    let paymenttype = await Paymenttype.findOne({ where: { paymenttypeId: id }})
    res.status(200).send(paymenttype)

}

//  update payment type by ID
const updatPaymentTypeById = async (req, res) => {

    let id = req.params.id
    await Paymenttype.update(req.body, { where: { paymenttypeId: id }})
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
   
}

//  Delete Payment Type by ID
const deletePaymenTypeById = async (req, res) => {

    let id = req.params.id
    await Paymenttype.destroy({ where: { paymenttypeId: id }} )
    .then((data)=>{
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
    addPaymentType,
    getAllPaymenttTypes,
    getPaymentTypeById,
    updatPaymentTypeById,
    deletePaymenTypeById   

}
