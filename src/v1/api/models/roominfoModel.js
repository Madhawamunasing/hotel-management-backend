const db= require('../models')

const Room= db.rooms
module.exports=(sequelize,DataTypes)=>{

    const Roominfo=sequelize.define("roominfo",{
        roominfoId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false,
            // references: { model: 'hotels', key: 'hotelId' },
        },
        // roomTypeId:{
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     allowNull:false,
        //     // references: { model: 'roomtypes', key: 'roomTypeId' },

        // },
        // roomId:{
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     allowNull:false,
        //     // references: { model: 'rooms', key: 'roomId' },
        // },
              
    })

    
    return Roominfo
}