module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    reviewId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
    },
    stars: {
      type: DataTypes.INTEGER,
      max: 5,
      min: 0,
      defaultValue: 0,
    },
  })
  return Review
}
