module.exports=(sequelize,DataTypes)=>{
    
    const Request= sequelize.define("request",{

        requetlId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        description:{
            type: DataTypes.STRING
        },
        isAccepted:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        responseAt:{
            type: DataTypes.DATE,
            allowNull:true
        },
        userId:{
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'uId' },
            onDelete: 'CASCADE',
        }
        
    })
    return Request
}