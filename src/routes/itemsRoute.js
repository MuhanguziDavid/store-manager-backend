import express from 'express';
import ItemsController from '../controllers/itemsController';

const router = express.Router();

router.get('/', ItemsController.retrieveItems);
router.post('/items', ItemsController.postItem);
router.get('/items/:artNumber', ItemsController.retrieveSingleItem);

export default router;
