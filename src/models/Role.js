module.exports = (sequelize, DataTypes) =>
  sequelize.define('role', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      required: true,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: true
    }
  },{
    paranoid: true,
    timestamps: true,
  });







