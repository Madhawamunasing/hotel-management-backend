module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('bookings', {
    bookingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    checkInDate: {
      type: DataTypes.DATE,
    },
    checkOutDate: {
      type: DataTypes.DATE,
    },
    specialRequest: {
      type: DataTypes.TEXT,
    },
    arrivalTime: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
    },
    guestName: {
      type: DataTypes.STRING,
    },
    contactNo: {
      type: DataTypes.STRING,
    },
    rentCar: {
      type: DataTypes.BOOLEAN,
    },
    noRooms: {
      type: DataTypes.INTEGER,
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'uId' },
      onDelete: 'CASCADE',
    },
  })
  return Booking
}
