'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define('checkout', {
    checkoutTime: DataTypes.DATE,
    collector: DataTypes.STRING,
    description: DataTypes.STRING,
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