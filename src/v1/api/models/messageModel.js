module.exports=(sequelize,DataTypes)=>{

    const Message=sequelize.define("message",{
        messageId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        notification:{
            type: DataTypes.STRING
        },
        type:{
            type: DataTypes.STRING
        },
        from:{
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'uId' },
            onDelete: 'CASCADE',
        },
        to:{
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'uId' },
            onDelete: 'CASCADE',
            
        },
        mardRead:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    return Message
}