module.exports = (sequelize, DataTypes) => {
  const RoomImage = sequelize.define('roomimage', {
    imageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    cloudinary_id: {
      type: DataTypes.STRING,
    },
  })
  return RoomImage
}
