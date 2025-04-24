"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart, {
        foreignKey: "user_id",
        as: "cart",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "order",
        onDelete: "CASCADE",
      });
    }

    // methode pour verifier le mot de passe
    async verifyPassword(password) {
      if (!this.password || !password) return false;
      return await bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Le prenom de l'utilisateur",
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Addresse email invalide",
          },
        },
      },
      role: { type: DataTypes.ENUM("client", "admin"), defaultValue: "client" },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 15],
            msg: "Ton mot de passe doit contenir entre 5(min) et 15(max) caratères",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    }
  );
  return User;
};
