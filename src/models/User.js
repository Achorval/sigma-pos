module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
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
    token: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true,
      required: true,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    }
  });



  
