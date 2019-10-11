import express from 'express';
import ItemsController from '../controllers/itemsController';

const router = express.Router();

router.get('/', ItemsController.retrieveItems);
router.post('/items', ItemsController.postItems);

export default router;
