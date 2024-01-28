module.exports = (sequelize, DataTypes) => {
  const Customergrade = sequelize.define('customergrade', {
    customergradelId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    rank: {
      type: DataTypes.STRING,
    },
    points: {
      type: DataTypes.INTEGER,
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'uId' },
      onDelete: 'CASCADE',
    },
  })
  return Customergrade
}
