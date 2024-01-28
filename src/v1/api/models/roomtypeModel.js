module.exports = (sequelize, DataTypes) => {
  const Roomtypes = sequelize.define('roomtype', {
    roomTypeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    // attributes:{
    //     type: DataTypes.JSON
    // },
    description: {
      type: DataTypes.STRING,
    },
    beds: {
      type: DataTypes.INTEGER,
    },
  })
  return Roomtypes
}
