'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define('checkout', {
    collector: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {

  });
  Checkout.associate = function(models) {
    Checkout.belongsTo(models.item, {
      foreignKey: 'itemId',
      as: 'items',
    });
  };
  return Checkout;
};