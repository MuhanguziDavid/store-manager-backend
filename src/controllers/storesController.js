import { Op } from 'sequelize';
import { sequelize} from '../models'
import models from '../models';
import Errors from '../helpers/errors';

class StoresController {
  static async createStore(req, res, next) {
    try {
      const createdStore = await models.stores.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Store created successfully',
        store: createdStore,
      })
    } catch (error) {
      next(error);
    }
  }
}

export default StoresController;
