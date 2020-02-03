'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('items', 'initialQantity', 'initialQuantity')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('items', 'initialQuantity', 'initialQantity')
    ])
  }
};
