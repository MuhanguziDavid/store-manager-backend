import express from 'express';
import ReportsController from '../controllers/reportsController';

const router = express.Router();

router.get('/reports/checkout', ReportsController.getReport);
router.get('/reports/checkin', ReportsController.getCheckinReport);

export default router;
