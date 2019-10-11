'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    artNumber: DataTypes.STRING,
    color: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    store: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    Item.hasMany(models.checkout, {
      foreignKey: 'itemId',
      as: 'items',
      onDelete: 'CASCADE',
    });
  };
  return Item;
};