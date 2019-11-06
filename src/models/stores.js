'use strict';
module.exports = (sequelize, DataTypes) => {
  const stores = sequelize.define('stores', {
    store: DataTypes.STRING
  }, {});
  stores.associate = function(models) {
    stores.hasMany(models.item, {
      foreignKey: 'storeId',
      as: 'stores',
      onDelete: 'CASCADE',
    });
  };
  return stores;
};