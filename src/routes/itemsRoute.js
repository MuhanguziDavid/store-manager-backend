import express from 'express';
import ItemsController from '../controllers/itemsController';

const router = express.Router();

router.get('/items', ItemsController.retrieveItems);
router.get('/uniqueitems', ItemsController.retrieveUniqueItems);
router.post('/items', ItemsController.postItem);
router.get('/items/:artNumber', ItemsController.retrieveSingleItem);
router.put('/items/:id', ItemsController.editItem);
router.delete('/items/:id', ItemsController.deleteItem);

export default router;
