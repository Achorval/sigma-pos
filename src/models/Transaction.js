module.exports = (sequelize, DataTypes) =>
  sequelize.define('transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING(30),
      required: true,
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE,
      required: true,
      allowNull: false,
      get() {
        const amount = this.getDataValue('amount');
        return (amount*1).toString();
      }
    },
    type: {
      type: DataTypes.STRING(12),
      required: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(12),
      required: true,
      allowNull: false
    }
  });