'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('checkouts', 'description')
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.addColumn(
      'checkouts', 'description',
      {
        type: Sequelize.STRING
      }
    )]
  }
};
