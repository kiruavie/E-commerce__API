"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.CartItem, {
        foreignKey: "product_id",
        as: "cart_items",
        onDelete: "CASCADE",
      });

      this.hasMany(models.OrderItem, {
        foreignKey: "product_id",
        as: "order_items",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: [10, 300],
          msg: "Le nombre de caractère est compris entre 10 et 300",
        },
      },
      price: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0,
        },
      },
      available: { type: DataTypes.BOOLEAN(), defaultValue: true },
      image: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
      underscored: true,
      timestamps: true,
    }
  );
  return Product;
};
