import { Op } from 'sequelize';
import { sequelize} from '../models'
import models from '../models';
import Errors from '../helpers/errors';

class ItemsController {
  static async retrieveItems(req, res, next) {
    const { artNumber, description, color, createdAt, store } = req.query;
    try {
      let artNumberFilter = { [Op.ne]: null }
      let descriptionFilter = { [Op.ne]: null }
      let colorFilter = { [Op.ne]: null }
      let storeFilter = { [Op.ne]: null }
      let createdAtFilter = { [Op.ne]: null }
      if (artNumber) {
        artNumberFilter = { [Op.eq]: artNumber }
      }
      if (description) {
        descriptionFilter = { [Op.substring]: description }
      }
      if (color) {
        colorFilter = { [Op.eq]: color }
      }
      if (store) {
        storeFilter = { [Op.eq]: store }
      }
      if (createdAt) {
        createdAtFilter = { [Op.gt]: createdAt }
      }
      const foundItems = await models.item.findAll({
        where: {
          artNumber: artNumberFilter,
          description: descriptionFilter,
          color: colorFilter,
          createdAt: createdAtFilter,
        },
        attributes: ['artNumber', 'color', 'description', 'quantity', 'createdAt', 'updatedAt'],
        include: [{
          model: models.stores,
          as: 'stores',
          where: {
            store: storeFilter
          },
          attributes: ['store']
        }]
      });
      return res.status(200).json({
        success: true,
        message: 'Items retrieved successfully',
        foundItems
      })
    } catch (error) {
      next(error);
    }
  }

  static async retrieveUniqueItems(req, res, next) {
    try {
      const foundItems = await models.item.findAll({
        attributes: [
          [sequelize.fn('DISTINCT', sequelize.col('artNumber')) ,'artNumber'],
          'description', ]
      });
      return res.status(200).json({
        success: true,
        message: 'Items retrieved successfully',
        foundItems
      })
    } catch (error) {
      next(error);
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

  static async postItem(req, res, next) {
    try {
      let newItem;
      const similarItem = await models.item.findAll({
        where: {
          artNumber: req.body.artNumber,
          color: req.body.color,
          description: req.body.description,
          storeId: req.body.storeId
        },
        returning: true,
        plain: true
      })
      if (similarItem) {
        req.body.quantity = Number(req.body.quantity) + similarItem.dataValues.quantity;
        const updatedItem = await models.item.update(req.body,
          { where: { id: similarItem.dataValues.id }, returning: true, plain: true });
        newItem = updatedItem[1];
      } else {
        newItem = await models.item.create(req.body);
      }
      return res.status(200).json({
        success: true,
        message: 'Item created successfully',
        item: newItem,
      })
    } catch (error) {
      next(error);
    }
  }

  static async editItem(req, res, next) {
    try {
      const itemId = req.params.id;
      const foundItem = await models.item.findByPk(itemId);
      if (!foundItem) {
        return Errors.errorHandler(res, 404, 'Item does not exist');
      }
      const editedItem = await models.item.update(req.body,
        { where: { id: itemId }, returning: true, plain: true });
      return res.status(200).json({
        success: true,
        message: 'Item edited successfully',
        item: editedItem[1],
      })
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const itemId = req.params.id;
      const foundItem = await models.item.findByPk(itemId);
      if (!foundItem) {
        return Errors.errorHandler(res, 404, 'Item does not exist');
      }
      const deletedItem = await models.item.destroy({
        where: { id: itemId }
      });
      return res.status(200).json({
        success: true,
        message: 'Item deleted successfully',
      })
    } catch (error) {
      next(error);
    }
  }
}

export default ItemsController;
