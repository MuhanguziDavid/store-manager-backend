import express from 'express';
import ReportsController from '../controllers/reportsController';

const router = express.Router();

router.get('/reports', ReportsController.getReport);

export default router;
