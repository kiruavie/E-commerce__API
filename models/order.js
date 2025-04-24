"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "client",
        onDelete: "CASCADE",
      });

      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "items",
        onDelete: "CASCADE",
      });
    }
  }
  Order.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      montant_total: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0,
        },
      },
      statut: {
        type: DataTypes.ENUM("payed", "pending", "cancelled"),
        defaultValue: "pending",
      },
      info_payment: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
      underscored: true,
      timestamps: true,
    }
  );
  return Order;
};
