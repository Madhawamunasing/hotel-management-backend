module.exports=(sequelize,DataTypes)=>{
    const VAS= sequelize.define("vas",{
        
        vasId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        name:{
            type: DataTypes.STRING
        },
        rate:{
            type: DataTypes.FLOAT                        
        },
       
    })
    return VAS
}