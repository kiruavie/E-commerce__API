"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      Cart.hasMany(models.CartItem, {
        foreignKey: "cart_id",
        as: "cart_items",
        onDelete: "CASCADE",
      });
    }
  }
  Cart.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      total_price: DataTypes.FLOAT,
      statut: {
        type: DataTypes.ENUM("active", "completed", "cancelled"),
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "Cart",
      underscored: true,
      timestamps: true,
    }
  );
  return Cart;
};
