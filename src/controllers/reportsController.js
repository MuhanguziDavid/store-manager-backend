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
            [Op.lte]: endDateFilter,
            [Op.gte]: startDateFilter
          }
        },
        attributes: ['id', 'collector', 'quantity', 'createdAt', 'updatedAt'],
        include: [{
          model: models.item,
          as: 'items',
          where: {
            artNumber: artNumberFilter,
            description: descriptionFilter,
            color: colorFilter,
          },
          attributes: ['id', 'artNumber', 'color', 'description', 'quantity'],
          include: [{
            model: models.stores,
            as: 'stores',
            where: {
              store: storeFilter
            },
            attributes: ['id', 'store']
          }]
        }]
      });

      const formattedReport = retrievedReport.map(ReportsController.rearrangeReport)

      return res.status(200).json({
        success: true,
        message: 'Report retrieved successfully',
        checkoutReport: formattedReport,
      })
    } catch (error) {
      next(error);
    }
  }

  static async getCheckinReport(req, res, next) {
    try {
      const { artNumber, description, color, store, startDate, endDate } = req.query;
      if ((startDate && !moment(startDate).isValid()) || (endDate && !moment(endDate).isValid())) {
        return Errors.errorHandler(res, 404, 'Invalid date format provided please provide date in iso 8601 string');
      }
      let artNumberFilter = { [Op.ne]: null }
      let descriptionFilter = { [Op.ne]: null }
      let colorFilter = { [Op.ne]: null }
      let storeFilter = { [Op.ne]: null }
      let startDateFilter = { [Op.ne]: null }
      let endDateFilter = { [Op.ne]: null }
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
      const retrievedReport = await models.item.findAll({
        where: {
          createdAt: {
            [Op.lte]: endDateFilter,
            [Op.gte]: startDateFilter,
          },
          artNumber: artNumberFilter,
          description: descriptionFilter,
          color: colorFilter,
        },
        attributes: ['id', 'artNumber', 'color', 'description', 'quantity', 'createdAt', 'updatedAt'],
        include: [{
          model: models.stores,
          as: 'stores',
          where: {
            store: storeFilter
          },
          attributes: ['id', 'store']
        }]
      });

      const formattedReport = retrievedReport.map(ReportsController.rearrangeCheckinReport)

      return res.status(200).json({
        success: true,
        message: 'Report retrieved successfully',
        checkinReport: formattedReport,
      })
    } catch (error) {
      next(error);
    }
  }

  static rearrangeReport (reportObject) {
    const formattedReport = {
      id: reportObject.id,
      collector: reportObject.collector,
      checkoutQuantity: reportObject.quantity,
      createdAt: reportObject.createdAt,
      updatedAt: reportObject.updatedAt,
      itemId: reportObject.items.id,
      artNumber: reportObject.items.artNumber,
      color: reportObject.items.color,
      description: reportObject.items.description,
      itemQuantity: reportObject.items.quantity,
      storeId: reportObject.items.stores.id,
      store: reportObject.items.stores.store,
    };
    return formattedReport;
  }

  static rearrangeCheckinReport (reportObject) {
    const formattedReport = {
      id: reportObject.id,
      artNumber: reportObject.artNumber,
      color: reportObject.color,
      description: reportObject.description,
      checkoutQuantity: reportObject.quantity,
      createdAt: reportObject.createdAt,
      updatedAt: reportObject.updatedAt,
      storeId: reportObject.stores.id,
      store: reportObject.stores.store,
    };
    return formattedReport;
  }
}

export default ReportsController;
