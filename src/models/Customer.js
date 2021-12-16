module.exports = (sequelize, DataTypes) =>
  sequelize.define('customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(100),
      required: true,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(100),
      required: true,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(200),
      unique: true,
      required: true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true,
      required: true,
      allowNull: true
    },
    pin: {
      type: DataTypes.STRING(4),
      required: true,
      allowNull: true
    },
  });



  