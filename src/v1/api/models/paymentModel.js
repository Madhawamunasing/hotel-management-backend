module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    paymentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'uId' },
    },
    paymenttype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      references: { model: 'bookings', key: 'bookingId' },
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.REAL,
    },
    payment: {
      type: DataTypes.REAL,
    },
  })
  return Payment
}
