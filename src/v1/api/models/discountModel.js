module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('discount', {
    discountId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    validTill: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  })
  return Discount
}
