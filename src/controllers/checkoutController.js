import { Op } from 'sequelize';
import { sequelize} from '../models'
import models from '../models';
import Errors from '../helpers/errors';

class CheckoutController {
  static async checkoutItem(req, res, next) {
    try {
      const foundItem = await models.item.findAll({
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true
      })
      if (!foundItem) {
        return Errors.errorHandler(res, 404, 'Item does not exist');
      }
      const newItemQuantity = foundItem.dataValues.quantity - Number(req.body.quantity)
      console.log('foundItem', foundItem.dataValues);
      if (newItemQuantity < 0) {
        return Errors.errorHandler(
          res,
          404,
          `Only ${foundItem.dataValues.quantity} items of this type left in the store, please select fewer items for checkout`
        );
      }
      const checkoutData = {
        ...req.body,
        itemId: req.params.id
      }
      const checkedoutItem = await models.checkout.create(checkoutData);
      const newBody = {
        quantity: newItemQuantity
      }
      await models.item.update(newBody,
        { where: { id: req.params.id }, returning: true, plain: true });
      return res.status(200).json({
        success: true,
        message: 'Item checked out successfully',
        checkedoutItem: checkedoutItem,
      })
    } catch (error) {
      next(error);
    }
  }
}

export default CheckoutController;
