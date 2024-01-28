const { NOW } = require('sequelize');
var Sequelize = require('sequelize');
const db= require('../models')
const Request= db.requests
const Role= db.roles

//send new request
const createRequest = async(req,res) =>{

    let info={
        description:req.body.description,
        isAccepted:req.body.isAccepted,      
        userId:req.body.userId
    }

    const user=await Request.create(info)
    .then(request=>res.status(200).send(request))
    .catch((err)=>{
        res.status(500).send(err)
    })

}
// Get all requests
const getAllRequest = async (req, res) => {

    let request = await Request.findAll({})
    res.status(200).send(request)

}

//Get message by request ID
const getRequestByRequestId = async (req, res) => {

    let id = req.body.id
    await Request.findAll({ where: { requetlId: id }})
    .then(request=>res.status(200).send(request))
    .catch(err=>console.log(err))


}
//Get message by hoteladmin ID
const getRequestByhotelAdminId = async (req, res) => {

    let id = req.body.id
    await Request.findAll({ where: { hotelAdminId: id }})
    .then(request=>res.status(200).send(request))
    .catch(err=>console.log(err))


}

//accept or reject account request
const acceptRequest = async(req,res)=>{

    let id= req.body.id
    let isAccepted= req.body.isAccepted
    await Request.update({isAccepted:isAccepted,responseAt:Sequelize.fn('NOW')}, { where: { requetlId: id }})
    .then(async(request)=>{
        
       await Request.findOne({ where: { requetlId: id },attributes:['userId']})
        .then(async (userId)=>{
            console.log(userId.userId);
       
            await Role.update({hotelAdmin:true}, { where: { userUId: userId.userId }})
            .then((accepted)=>{
                res.status(200).send("accepted")
                console.log(request);
            })
            .catch((err)=>{
                res.status(500).send(err)
            })
        })
        .catch((err)=>{
            res.status(500).send(err)
        })
       
   
    })
    .catch((err)=>{
        res.status(500).send(err)
    })

}



module.exports={
    createRequest,
    getAllRequest,
    getRequestByRequestId,
    getRequestByhotelAdminId,
    acceptRequest
}