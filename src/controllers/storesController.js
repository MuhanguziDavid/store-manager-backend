import { Op } from 'sequelize';
import { sequelize} from '../models'
import models from '../models';
import Errors from '../helpers/errors';

class StoresController {
  static async createStore(req, res, next) {
    try {
      const createdStore = await models.stores.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Store created successfully',
        store: createdStore,
      })
    } catch (error) {
      next(error);
    }
  }

  static async retrieveStores(req, res, next) {
    try {
      const retrievedStores = await models.stores.findAll({
        attributes: ['id', 'store'],
        order: [ ['store', 'ASC'] ],
      });
      res.render(
        'index',
        {
          title: "Stores",
          retrievedStores: retrievedStores,
        });
      // return res.status(200).json({
      //   success: true,
      //   message: 'Stores Retieved Successfully',
      //   stores: retrievedStores,
      // })
    } catch (error) {
      next(error);
    }
  }

  static async editStores(req, res, next) {
    try {
      const storeId = req.params.id;
      const foundStore = await models.stores.findByPk(storeId);
      if (!foundStore) {
        return Errors.errorHandler(res, 404, 'Store does not exist');
      }
      const editedStore = await models.stores.update(req.body,
        { where: { id: storeId }, returning: true, plain: true });
      return res.status(200).json({
        success: true,
        message: 'Store edited successfully',
        store: editedStore[1],
      })
    } catch (error) {
      next(error);
    }
  }

  static async deleteStore(req, res, next) {
    try {
      const storeId = req.params.id;
      const foundStore = await models.stores.findByPk(storeId);
      if (!foundStore) {
        return Errors.errorHandler(res, 404, 'Store does not exist');
      }
      await models.stores.destroy({
        where: { id: storeId }
      });
      return res.status(200).json({
        success: true,
        message: 'Store deleted successfully',
      })
    } catch (error) {
      next(error);
    }
  }
}

export default StoresController;
