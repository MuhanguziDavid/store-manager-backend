'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('checkouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checkoutTime: {
        type: Sequelize.DATE
      },
      collector: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id',
          as: 'item',
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('checkouts');
  }
};