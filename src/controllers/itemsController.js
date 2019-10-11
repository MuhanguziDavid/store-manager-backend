import models from '../models';

class ItemsController {
  static async retrieveItems(req, res) {
    try {
      const foundItems = await models.item.findAll({
        attributes: ['artNumber', 'color', 'description', 'quantity', 'store']
      });
      return res.status(200).json({
        success: true,
        message: 'Items retrieved successfully',
        foundItems
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error
      });;
    }
  }

  static async postItems(req, res) {
    try {
      const newItem = await models.item.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Item created successfully',
        item: newItem,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error
      });;
    }
  }
}

export default ItemsController;
