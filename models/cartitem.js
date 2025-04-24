"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cart",
        onDelete: "CASCADE",
      });

      CartItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
        onDelete: "CASCADE",
      });
    }
  }

  CartItem.init(
    {
      cart_id: { type: DataTypes.INTEGER },
      product_id: { type: DataTypes.INTEGER },
      quantity: {
        type: DataTypes.INTEGER,
        validate: { min: 1 },
      },
      sub_total: {
        type: DataTypes.INTEGER,
        validate: { min: 0 },
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "CartItems",
      timestamps: true,
      underscored: true,
      hooks: {
        // Hook before save to calculate sub_total
        beforeSave: async (cartItem) => {
          if (cartItem.quantity && cartItem.product_id) {
            const product = await sequelize.models.Product.findByPk(
              cartItem.product_id
            );
            if (product) {
              cartItem.sub_total = product.price * cartItem.quantity;
            }
          }
        },
      },
    }
  );

  return CartItem;
};
