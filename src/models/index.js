var fs          =   require('fs');
var path        =   require('path');
var Sequelize   =   require('sequelize');
var config      =   require('../core/config');
var db          =   {};

const sequelize = new Sequelize(
    config.db.database, 
    config.db.username, 
    config.db.password, 
    config.db.options)

fs
    .readdirSync(__dirname).filter((file) => file !== 'index.js')
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize       

db.user.belongsTo(db.role);
db.role.hasOne(db.user);
db.transaction.belongsTo(db.customer);
db.customer.hasMany(db.transaction);
db.transaction.belongsTo(db.user);
db.user.hasMany(db.transaction);

module.exports = db