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

  static async editCheckout(req, res, next) {
    try {
      const checkoutId = req.params.id;
      const foundCheckout = await models.checkout.findByPk(checkoutId);
      if (!foundCheckout) {
        return Errors.errorHandler(res, 404, 'Record does not exist');
      }

      const foundItem = await models.item.findAll({
        where: {
          id: foundCheckout.dataValues.itemId,
        },
        returning: true,
        plain: true
      });
      const revertPreviousQuanity = foundItem.dataValues.quantity + foundCheckout.dataValues.quantity;
      const newItemQuantity = revertPreviousQuanity - Number(req.body.quantity);
      if (newItemQuantity < 0) {
        return Errors.errorHandler(
          res,
          404,
          `Only ${revertPreviousQuanity} items of this type left in the store, please select fewer items for checkout`
        );
      }

      const editedCheckout = await models.checkout.update(req.body,
        { where: { id: checkoutId }, returning: true, plain: true });

      const newBody = {
        quantity: newItemQuantity
      }
      await models.item.update(newBody,
        { where: { id: foundCheckout.dataValues.itemId }, returning: true, plain: true });

      return res.status(200).json({
        success: true,
        message: 'Edited successfully',
        checkedoutItem: editedCheckout[1],
      })
    } catch (error) {
      next(error);
    }
  }
}

export default CheckoutController;
