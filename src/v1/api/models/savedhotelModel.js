module.exports = (sequelize, DataTypes) => {
  const Savedhotel = sequelize.define('saved_hotel', {
    customerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: 'users', key: 'uId' },
      onDelete: 'CASCADE',
    },
    hotelId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: 'hotels', key: 'hotelId' },
      onDelete: 'CASCADE',
    },
  })
  return Savedhotel
}
