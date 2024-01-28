const dbConfig = require('../../../../config/dbConfig.js')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle,
  },
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected......')
  })
  .catch((err) => {
    console.log('Error ' + err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.messages = require('./messageModel.js')(sequelize, DataTypes)
db.hotels = require('./hotelModel.js')(sequelize, DataTypes)
db.requests = require('./requestModel.js')(sequelize, DataTypes)
db.refferals = require('./refferalModel.js')(sequelize, DataTypes)
db.coupons = require('./couponModel.js')(sequelize, DataTypes)
db.rooms = require('./roomModel.js')(sequelize, DataTypes)
db.roomtypes = require('./roomtypeModel.js')(sequelize, DataTypes)
db.bookings = require('./bookingModel.js')(sequelize, DataTypes)
db.souveniries = require('./souvenirModel.js')(sequelize, DataTypes)
db.souveniries = require('./souvenirModel.js')(sequelize, DataTypes)
// db.paymenttypes = require('./paymenttypeModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
db.vas = require('./vasModel.js')(sequelize, DataTypes)
db.roominfo = require('./roominfoModel.js')(sequelize, DataTypes)
db.payments = require('./paymentModel.js')(sequelize, DataTypes)
db.customergrades = require('./customergradeModel.js')(sequelize, DataTypes)
db.customergrades = require('./customergradeModel.js')(sequelize, DataTypes)
db.roles = require('./roleModel.js')(sequelize, DataTypes)
db.savedhotels = require('./savedhotelModel.js')(sequelize, DataTypes)
db.roomimages = require('./roomimageModel.js')(sequelize, DataTypes)
db.facilities = require('./facilityModel.js')(sequelize, DataTypes)
db.facilitytypes = require('./facilitytypeModel.js')(sequelize, DataTypes)
db.discounts = require('./discountModel.js')(sequelize, DataTypes)
db.hotelrules = require('./hotelrules.js')(sequelize, DataTypes)

//one-one associations
db.users.hasOne(db.roles, {
  foriegnKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})
db.roles.belongsTo(db.users)

//one-to-many  associations
db.users.hasMany(db.hotels, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})
db.rooms.hasMany(db.roomimages, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})
db.hotels.hasMany(db.hotelrules, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})
db.users.hasMany(db.reviews, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})
db.hotels.hasMany(db.reviews, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})
// db.roomtypes.hasMany(db.rooms, {
//   onDelete: 'cascade',
//   foreignKey: {
//     allowNull: false,
//   },
// })
db.hotels.hasMany(db.facilities, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})

db.facilitytypes.hasMany(db.facilities, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})
db.hotels.hasMany(db.facilitytypes, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})
db.hotels.hasMany(db.roomtypes, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})
db.hotels.hasMany(db.discounts, {
  onDelete: 'cascade',
  foreignKey: {
    allowNull: false,
  },
})

db.hotels.belongsTo(db.users)
db.facilities.belongsTo(db.facilitytypes)
db.facilitytypes.belongsTo(db.hotels)
db.roomtypes.belongsTo(db.hotels)
db.discounts.belongsTo(db.hotels)
db.reviews.belongsTo(db.hotels)
db.reviews.belongsTo(db.users)

//many-many associations
db.vas.belongsToMany(db.hotels, { through: 'Hotel_VAS', onDelete: 'cascade' })
db.hotels.belongsToMany(db.vas, { through: 'Hotel_VAS', onDelete: 'cascade' })

db.bookings.belongsToMany(db.vas, {
  through: 'Booking_VAS',
  onDelete: 'cascade',
})
db.vas.belongsToMany(db.bookings, {
  through: 'Booking_VAS',
  onDelete: 'cascade',
})

// db.roominfo.belongsTo(db.rooms)
// db.roominfo.belongsTo(db.hotels)
// db.roominfo.belongsTo(db.bookings)

db.bookings.belongsTo(db.rooms, { onDelete: 'cascade' })
db.bookings.belongsTo(db.hotels, { onDelete: 'cascade' })

db.rooms.belongsTo(db.hotels, { onDelete: 'cascade' })
db.rooms.belongsTo(db.roomtypes, { onDelete: 'cascade' })

db.sequelize
  .sync({ force: false })
  //db.sequelize.sync({force:false})
  .then(() => {
    console.log('re-synced ...')
  })

module.exports = db
