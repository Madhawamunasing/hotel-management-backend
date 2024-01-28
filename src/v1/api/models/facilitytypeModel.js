module.exports = (sequelize, DataTypes) => {
  const Facilitytype = sequelize.define('facilitytype', {
    facilityTypeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  })
  return Facilitytype
}
