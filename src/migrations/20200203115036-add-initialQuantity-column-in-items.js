'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('items', 'initialQantity', {
        allowNull: true,
        type: Sequelize.INTEGER,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('items', 'initialQantity', {
        allowNull: true,
        type: Sequelize.STRING,
      }),
    ])
  }
};
