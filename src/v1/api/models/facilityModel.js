module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define('facility', {
    facilityId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  })
  return Facility
}
