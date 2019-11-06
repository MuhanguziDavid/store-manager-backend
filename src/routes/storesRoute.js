import express from 'express';
import StoresController from '../controllers/storesController';

const router = express.Router();

router.post('/stores', StoresController.createStore);

export default router;
