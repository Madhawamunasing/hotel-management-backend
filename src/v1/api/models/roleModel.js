module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hotelAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    customer: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
  return Role
}
