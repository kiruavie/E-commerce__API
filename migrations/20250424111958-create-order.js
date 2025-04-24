"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Nom de la table référencée
          key: "id",
        },
        onDelete: "CASCADE", // Supprime les commandes si l'utilisateur est supprimé
      },
      montant_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0, // Assure que le montant total est un nombre positif ou nul
        },
      },
      statut: {
        type: Sequelize.ENUM("payed", "pending", "cancelled"),
        defaultValue: "pending", // Statut par défaut
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
    await queryInterface.dropTable("Orders");
  },
};
