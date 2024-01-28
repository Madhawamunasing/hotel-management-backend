module.exports = (sequelize, DataTypes) => {
  const Hotelrule = sequelize.define('hotel_rules', {
    hotelRuleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    rule: {
      type: DataTypes.STRING,
    },
  })
  return Hotelrule
}
