import { Op } from 'sequelize';
import moment from 'moment';
import { sequelize} from '../models'
import models from '../models';
import Errors from '../helpers/errors';

class ReportsController {
  static async getReport(req, res, next) {
    try {
      const { artNumber, description, color, store, startDate, endDate, collector } = req.query;
      if ((startDate && !moment(startDate).isValid()) || (endDate && !moment(endDate).isValid())) {
        return Errors.errorHandler(res, 404, 'Invalid date format provided please provide date in iso 8601 string');
      }
      let artNumberFilter = { [Op.ne]: null }
      let descriptionFilter = { [Op.ne]: null }
      let colorFilter = { [Op.ne]: null }
      let storeFilter = { [Op.ne]: null }
      let startDateFilter = { [Op.ne]: null }
      let endDateFilter = { [Op.ne]: null }
      let collectorFilter = { [Op.ne]: null }
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
      if (startDate) {
        startDateFilter = startDate
      }
      if (endDate) {
        endDateFilter = endDate
      }
      if (collector) {
        collectorFilter = { [Op.eq]: collector }
      }
      const retrievedReport = await models.checkout.findAll({
        where: {
          collector: collectorFilter,
          createdAt: {
            [Op.lt]: endDateFilter,
            [Op.gt]: startDateFilter
          }
        },
        include: [{
          model: models.item,
          as: 'items',
          where: {
            artNumber: artNumberFilter,
            description: descriptionFilter,
            color: colorFilter,
          },
          attributes: ['artNumber', 'color', 'description', 'quantity'],
          include: [{
            model: models.stores,
            as: 'stores',
            where: {
              store: storeFilter
            },
            attributes: ['store']
          }]
        }]
      });
      return res.status(200).json({
        success: true,
        message: 'Report retrieved successfully',
        report: retrievedReport,
      })
    } catch (error) {
      next(error);
    }
  }
}

export default ReportsController;
