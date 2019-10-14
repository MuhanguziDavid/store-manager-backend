import models from '../models';
import Errors from '../helpers/errors';

class ItemsController {
  static async retrieveItems(req, res) {
    try {
      const foundItems = await models.item.findAll();
      return res.status(200).json({
        success: true,
        message: 'Items retrieved successfully',
        foundItems
      })
    } catch (error) {
      return Errors.errorHandler(res, 500, error);
    }
  }

  static async retrieveSingleItem(req, res, next) {
    try {
      const { artNumber } = req.params;
      const foundItem = await models.item.findAll({
        where: {
          artNumber
        }
      })
      console.log('foundItem', foundItem.length);
      if (foundItem.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'The requested item does not exist',
          foundItem
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Item retrieved successfully',
        foundItem
      })
    } catch (error) {
      next(error);
    }
  }

  static async postItem(req, res) {
    try {
      const newItem = await models.item.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Item created successfully',
        item: newItem,
      })
    } catch (error) {
      return Errors.errorHandler(res, 500, error);
    }
  }
}

export default ItemsController;
