'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('items', 'storeId', {
      allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id',
          as: 'store',
        },
      }),
      queryInterface.removeColumn('items', 'store')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('items', 'storeId', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('items', 'store', {
        type: Sequelize.STRING,
      })
    ])
  }
};
