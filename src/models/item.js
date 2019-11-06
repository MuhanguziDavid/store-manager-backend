'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    artNumber: DataTypes.STRING,
    color: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  }, {});
  Item.associate = function(models) {
    Item.hasMany(models.checkout, {
      foreignKey: 'itemId',
      as: 'items',
      onDelete: 'CASCADE',
    });
    Item.belongsTo(models.stores, {
      foreignKey: 'storeId',
      as: 'stores',
    });
  };
  return Item;
};