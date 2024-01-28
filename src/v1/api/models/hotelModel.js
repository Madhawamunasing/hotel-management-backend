module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('hotel', {
    hotelId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    district: {
      type: DataTypes.STRING,
    },
    town: {
      type: DataTypes.STRING,
    },
    Street1: {
      type: DataTypes.STRING,
    },
    Street2: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cloudinary_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan_cloudinary_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })
  return Hotel
}
