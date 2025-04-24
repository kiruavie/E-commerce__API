"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CartItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Carts", // Nom de la table référencée
          key: "id",
        },
        onDelete: "CASCADE", // Supprimer les éléments du panier si le panier est supprimé
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products", // Nom de la table référencée
          key: "id",
        },
        onDelete: "CASCADE", // Supprimer les éléments du panier si le produit est supprimé
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1, // La quantité doit être positive
        },
      },
      sub_total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0, // Le sous-total doit être un montant positif
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"), // Valeur par défaut pour la date de création
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"), // Valeur par défaut pour la date de mise à jour
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CartItems");
  },
};
